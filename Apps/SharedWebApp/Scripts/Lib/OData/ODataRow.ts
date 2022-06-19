import { FilteredArray } from "../Enumerable";
import { GridCellView } from "../Html/GridCellView";
import { GridRowView } from "../Html/GridRowView";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";

export class ODataRow {
    private readonly cells: ODataCell[] = [];

    constructor(rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) {
        let i = 0;
        for (const column of columns) {
            const cell = column.createDataCell(rowIndex, record, view.cell(i));
            this.cells.push(cell);
            i++;
        }
    }

    cellByView(view: GridCellView) {
        return new FilteredArray(
            this.cells,
            c => c.hasView(view)
        ).toEnumerableArray().first();
    }
}