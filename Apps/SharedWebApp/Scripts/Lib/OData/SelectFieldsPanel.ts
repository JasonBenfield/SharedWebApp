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

export class Result {
    static done() { return new Result({ done: {} }); }

    private constructor(private readonly result: IResult) { }

    get done() { return this.result.done; }
}

export class SelectFieldsPanel implements IPanel {
    private readonly awaitable = new Awaitable<Result>();
    private readonly selectFieldsList: ListGroup;

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
        this.awaitable.resolve(Result.done());
    }

    private save() {
        const selectedColumns = new MappedArray(
            new FilteredArray(
                this.selectFieldsList.getItems() as SelectFieldListItem[],
                item => item.isSelected
            ),
            item => item.column
        ).value();
        this.select.clear();
        this.select.addFields(...selectedColumns);
        this.awaitable.resolve(Result.done());
    }

    start() { return this.awaitable.start(); }

    activate() {
        this.selectFieldsList.clearItems();
        for (const selectedField of this.select.getExplicitlySelected()) {
            const column = this.columns.column(selectedField);
            this.selectFieldsList.addItem(
                column,
                (c, itemView: SelectFieldListItemView) => new SelectFieldListItem(c, true, itemView)
            );
        }
        for (const column of this.columns.selectableColumns()) {
            if (!this.select.containsExplicitySelected(column.columnName)) {
                this.selectFieldsList.addItem(
                    column,
                    (c, itemView: SelectFieldListItemView) => new SelectFieldListItem(c, false, itemView)
                );
            }
        }
        this.view.show();
    }

    deactivate() { this.view.hide(); }
}