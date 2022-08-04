import { ODataColumn } from "./ODataColumn";
import { ODataRow } from "./ODataRow";

export class ODataCellClickedEventArgs {
    constructor(
        readonly row: ODataRow,
        readonly column: ODataColumn,
        readonly record: any,
        readonly element: HTMLElement,
        readonly event: JQueryEventObject
    ) {
    }
}