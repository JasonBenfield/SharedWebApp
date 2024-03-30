import { IconCellView } from "./IconCellView";
import { ODataCell } from "./ODataCell";
import { ODataColumn } from "./ODataColumn";

export class BooleanIconCell extends ODataCell {
    constructor(
        rowIndex: number,
        column: ODataColumn,
        record: any,
        view: IconCellView,
        options: {
            true
        }
    ) {
        super(rowIndex, column, record, view);
    }
}