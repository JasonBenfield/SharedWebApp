import { GridCellView } from "../Html/GridCellView";
import { ODataColumn } from "./ODataColumn";

export class ODataCell {
    constructor(
        readonly rowIndex: number,
        readonly column: ODataColumn,
        readonly record: any,
        private readonly view: GridCellView
    ) {
        column.view.layouts.execute(rowIndex, view, column, record);
    }

    hasView(view: GridCellView) {
        return this.view === view;
    }
}