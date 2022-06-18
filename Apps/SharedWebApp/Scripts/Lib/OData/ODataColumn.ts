import { ODataColumnView } from "./ODataColumnView";
import { SourceType } from "./SourceType";

export class ODataColumn {
    constructor(
        readonly columnName: string,
        readonly sourceType: SourceType,
        readonly view: ODataColumnView
    ) {
    }
}