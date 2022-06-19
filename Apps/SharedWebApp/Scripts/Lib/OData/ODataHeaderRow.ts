import { FilteredArray } from "../Enumerable";
import { DefaultEvent, EventCollection } from "../Events";
import { GridCellView } from "../Html/GridCellView";
import { GridRowView } from "../Html/GridRowView";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";
import { ODataHeaderCell } from "./ODataHeaderCell";
import { ODataQueryOrderByBuilder } from "./ODataQueryBuilder";

export class ODataHeaderRow {
    private readonly cells: ODataCell[] = [];

    private readonly _sortClicked = new DefaultEvent<ODataColumn>(this);
    readonly sortClicked = this._sortClicked.handler();

    private readonly events = new EventCollection();

    constructor(columns: ODataColumn[], view: GridRowView) {
        let i = 0;
        for (const column of columns) {
            const cell = column.createHeaderCell(view.cell(i));
            if (cell instanceof ODataHeaderCell) {
                this.events.register(cell.sortClicked, this.onSortClicked.bind(this));
            }
            this.cells.push(cell);
            i++;
        }
    }

    private onSortClicked(column: ODataColumn) {
        this._sortClicked.invoke(column);
    }

    cellByView(view: GridCellView) {
        return new FilteredArray(
            this.cells,
            c => c.hasView(view)
        ).toEnumerableArray().first();
    }

    setOrderBy(orderBy: ODataQueryOrderByBuilder) {
        for (const cell of this.cells) {
            if (cell instanceof ODataHeaderCell) {
                const orderByField = orderBy.getField(cell.column.columnName);
                if (orderByField) {
                    if (orderByField.isAscending) {
                        cell.sortAsc();
                    }
                    else {
                        cell.sortDesc();
                    }
                }
                else {
                    cell.sortNotSet();
                }
            }
        }
    }

    disposeComponent() { this.events.dispose(); }
}