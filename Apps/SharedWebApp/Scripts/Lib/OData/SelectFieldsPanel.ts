import { Awaitable } from "../Awaitable";
import { BasicComponent } from "../Components/BasicComponent";
import { Command } from "../Components/Command";
import { ListGroup } from "../Components/ListGroup";
import { MessageAlert } from "../Components/MessageAlert";
import { MappedArray } from "../Enumerable";
import { AvailableFieldListItem } from "./AvailableFIeldListItem";
import { AvailableFieldListItemView } from "./AvailableFieldListItemView";
import { ODataColumnAccessor } from "./ODataColumnAccessor";
import { ODataQuerySelectBuilder } from "./ODataQueryBuilder";
import { SelectedFieldListItem } from "./SelectedFieldListItem";
import { SelectedFieldListItemView } from "./SelectedFieldListItemView";
import { SelectFieldsPanelView } from "./SelectFieldsPanelView";

interface IResult {
    done?: {};
}

export class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class SelectFieldsPanel extends BasicComponent implements IPanel {
    private readonly panelView: SelectFieldsPanelView
    private readonly awaitable = new Awaitable<Result>();
    private readonly availableFields: ListGroup;
    private readonly availableAlert: MessageAlert;
    private readonly selectedFields: ListGroup;
    private readonly selectedAlert: MessageAlert;

    constructor(
        private readonly select: ODataQuerySelectBuilder,
        private readonly columns: ODataColumnAccessor,
        view: SelectFieldsPanelView
    ) {
        super(view.body);
        this.panelView = view;
        this.availableAlert = this.addComponent(new MessageAlert(view.availableFieldsAlert));
        this.availableFields = this.addComponent(new ListGroup(view.availableFields));
        this.selectedAlert = this.addComponent(new MessageAlert(view.selectFieldsAlert));
        this.selectedFields = this.addComponent(new ListGroup(view.selectFields));
        view.handleDeleteButtonClick(this.onDeleteClicked.bind(this));
        view.handleSelectedFieldDragStart(this.onSelectFieldDragStart.bind(this));
        view.handleSelectedFieldDragEnter(this.onSelectFieldDragEnter.bind(this));
        view.handleSelectedFieldDragOver(this.onSelectFieldOver.bind(this));
        view.handleSelectedFieldDragEnd(this.onSelectFieldDragEnd.bind(this));
        view.handleSelectedFieldDrop(this.onSelectFieldDrop.bind(this));
        this.availableFields.registerItemClicked(this.onAvailableFieldClicked.bind(this));
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        new Command(this.save.bind(this)).add(view.saveButton);
    }

    private selectedFieldDragStart: SelectedFieldListItem;

    private onSelectFieldDragStart(el: HTMLElement, evt: JQueryEventObject) {
        this.selectedFieldDragStart = this.selectedFields.getItemByElement(el) as SelectedFieldListItem;
        this.selectedFieldDragStart.styleAsDragStart();
        const dragEvent = evt.originalEvent as DragEvent;
        dragEvent.dataTransfer.effectAllowed = 'move';
    }

    private onSelectFieldDragEnter(el: HTMLElement, evt: JQueryEventObject) {
        evt.preventDefault();
    }

    private onSelectFieldOver(el: HTMLElement, evt: JQueryEventObject) {
        evt.preventDefault();
        const dragEvent = evt.originalEvent as DragEvent;
        dragEvent.dataTransfer.dropEffect = 'move';
    }

    private onSelectFieldDragEnd(el: HTMLElement, evt: JQueryEventObject) {
        if (this.selectedFieldDragStart) {
            this.selectedFieldDragStart.styleAsDragEnd();
            this.selectedFieldDragStart = null;
        }
    }

    private onSelectFieldDrop(el: HTMLElement, evt: JQueryEventObject) {
        evt.stopPropagation();
        if (this.selectedFieldDragStart) {
            this.selectedFieldDragStart.styleAsDragEnd();
            const selectedField = this.selectedFields.getItemByElement(el);
            const destIndex = this.selectedFields.getItems().indexOf(selectedField);
            this.selectedFields.moveItem(this.selectedFieldDragStart, destIndex);
            this.selectedFieldDragStart = null;
        }
    }

    private onDeleteClicked(el: HTMLElement, evt: JQueryEventObject) {
        const selectedField = this.selectedFields.getItemByElement(el) as SelectedFieldListItem;
        if (selectedField) {
            evt.stopPropagation();
            this.selectedFields.removeItem(selectedField);
            this.availableFields.addItem(
                selectedField.column,
                (c, itemView: AvailableFieldListItemView) => new AvailableFieldListItem(c, itemView)
            );
        }
    }

    private onAvailableFieldClicked(availableField: SelectedFieldListItem) {
        this.selectedFields.addItem(
            availableField.column,
            (c, itemView: SelectedFieldListItemView) => new SelectedFieldListItem(c, itemView)
        );
        this.availableFields.removeItem(availableField);
        this.updateAlerts();
    }

    private cancel() {
        this.awaitable.resolve(Result.done());
    }

    private save() {
        const selectedColumns = new MappedArray(
            this.selectedFields.getItems() as SelectedFieldListItem[],
            item => item.column
        ).value();
        this.select.clear();
        this.select.addFields(...selectedColumns);
        this.awaitable.resolve(Result.done());
    }

    start() { return this.awaitable.start(); }

    activate() {
        this.availableFields.clearItems();
        this.selectedFields.clearItems();
        for (const selectedField of this.select.getExplicitlySelected()) {
            const column = this.columns.column(selectedField);
            this.selectedFields.addItem(
                column,
                (c, itemView: SelectedFieldListItemView) => new SelectedFieldListItem(c, itemView)
            );
        }
        for (const column of this.columns.selectableColumns()) {
            if (!this.select.containsExplicitySelected(column.columnName)) {
                this.availableFields.addItem(
                    column,
                    (c, itemView: AvailableFieldListItemView) => new AvailableFieldListItem(c, itemView)
                );
            }
        }
        this.updateAlerts();
        this.panelView.show();
    }

    private updateAlerts() {
        if (this.selectedFields.getItems().length === 0) {
            this.selectedAlert.warning('No fields have been selected.');
        }
        else {
            this.selectedAlert.clear();
        }
        if (this.availableFields.getItems().length === 0) {
            this.availableAlert.warning('No fields are available.');
        }
        else {
            this.availableAlert.clear();
        }
    }

    deactivate() { this.panelView.hide(); }
}