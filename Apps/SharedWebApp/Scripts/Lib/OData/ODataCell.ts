import { GridCellView } from "../Html/GridCellView";
import { ODataColumn } from "./ODataColumn";

export class ODataCell {
    constructor(
        readonly rowIndex: number,
        readonly column: ODataColumn,
        readonly record: any,
        protected readonly view: GridCellView
    ) {
    }

    hasView(view: GridCellView) {
        return this.view === view;
    }
}