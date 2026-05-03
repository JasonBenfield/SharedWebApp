import { ContextualClass } from "../../Lib/ContextualClass";
import { ODataColumn } from "../../Lib/OData/ODataColumn";
import { ODataRow } from "../../Lib/OData/ODataRow";
import { BasicGridRowView } from "../../Lib/Views/Grid";

export class ODataDemoRow extends ODataRow {
    constructor(rowIndex: number, columns: ODataColumn[], record: any, view: BasicGridRowView) {
        super(rowIndex, columns, record, view);
    }

    warn() {
        this.view.setContext(ContextualClass.warning);
    }

    highlight() {
        this.view.setContext(ContextualClass.success);
    }
}