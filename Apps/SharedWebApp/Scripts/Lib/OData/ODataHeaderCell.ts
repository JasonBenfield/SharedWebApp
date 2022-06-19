import { DefaultEvent } from "../Events";
import { TextBlock } from "../Html/TextBlock";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";
import { ODataHeaderCellView } from "./ODataHeaderCellView";

export class ODataHeaderCell extends ODataCell {
    protected readonly view: ODataHeaderCellView;

    private readonly _sortClicked = new DefaultEvent<ODataColumn>(this);
    readonly sortClicked = this._sortClicked.handler();

    constructor(
        column: ODataColumn,
        view: ODataHeaderCellView
    ) {
        super(0, column, null, view);
        new TextBlock(column.columnName, view.columnName).syncTitleWithText();
        this.view.sortButton.events.onClick(
            this.onSortButtonClicked.bind(this),
            options => options.preventDefault = true
        );
    }

    private onSortButtonClicked() {
        this._sortClicked.invoke(this.column);
    }

    sortNotSet() { this.view.sortNotSet(); }

    sortDesc() { this.view.sortDesc(); }

    sortAsc() { this.view.sortAsc(); }
}