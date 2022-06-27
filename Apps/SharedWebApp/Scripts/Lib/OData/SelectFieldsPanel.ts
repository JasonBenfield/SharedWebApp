import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { FilteredArray, MappedArray } from "../Enumerable";
import { ListGroup } from "../Components/ListGroup";
import { ODataColumnAccessor } from "./ODataColumnAccessor";
import { ODataQuerySelectBuilder } from "./ODataQueryBuilder";
import { SelectFieldListItem } from "./SelectFIeldListItem";
import { SelectFieldListItemView } from "./SelectFieldListItemView";
import { SelectFieldsPanelView } from "./SelectFieldsPanelView";

interface IResult {
    done?: {};
}

export class SelectFieldPanelResult {
    static done() { return new SelectFieldPanelResult({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class SelectFieldsPanel implements IPanel {
    private readonly awaitable = new Awaitable<SelectFieldPanelResult>();
    private readonly selectFieldsList: ListGroup;
    private readonly selectFieldListItems: SelectFieldListItem[] = [];

    constructor(
        private readonly select: ODataQuerySelectBuilder,
        private readonly columns: ODataColumnAccessor,
        private readonly view: SelectFieldsPanelView
    ) {
        this.selectFieldsList = new ListGroup(view.selectFields);
        this.selectFieldsList.registerItemClicked(this.onSelectFieldClicked.bind(this));
        new Command(this.cancel.bind(this)).add(view.cancelButton);
        new Command(this.save.bind(this)).add(view.saveButton);
    }

    private onSelectFieldClicked(selectFieldListItem: SelectFieldListItem) {
        selectFieldListItem.toggleSelect();
    }

    private cancel() {
        this.awaitable.resolve(SelectFieldPanelResult.done());
    }

    private save() {
        const selectedFields = new MappedArray(
            new FilteredArray(
                this.selectFieldListItems,
                item => item.isSelected
            ),
            item => item.fieldName
        ).value();
        this.select.clear();
        this.select.addFields(...selectedFields);
        this.awaitable.resolve(SelectFieldPanelResult.done());
    }

    start() { return this.awaitable.start(); }

    activate() {
        const listItems = this.selectFieldsList.setItems(
            this.columns.visibleSelectableColumns(),
            (column, itemView: SelectFieldListItemView) => {
                const isSelected = this.select.containsExplicitySelected(column.columnName);
                return new SelectFieldListItem(column.columnName, isSelected, itemView);
            }
        );
        this.selectFieldListItems.splice(0, this.selectFieldListItems.length, ...listItems);
        this.view.show();
    }

    deactivate() { this.view.hide(); }
}