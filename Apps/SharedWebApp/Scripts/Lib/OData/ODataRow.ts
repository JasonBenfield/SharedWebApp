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
            const cellView = view.cell(i);
            const cell = new ODataCell(rowIndex, column, record, cellView);
            this.cells.push(cell);
            i++;
        }
    }

    cellByView(view: GridCellView) {
        return new FilteredArray(
            this.cells,
            c => c.hasView(view)
        ).asEnumerable().first();
    }
}