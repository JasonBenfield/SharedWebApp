import { ODataColumn } from "./ODataColumn";

export class ODataCellClickedEventArgs {
    constructor(readonly column: ODataColumn, readonly record: any) {
    }
}