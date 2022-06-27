import { ContextualClass } from "../ContextualClass";
import { MappedArray } from "../Enumerable";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { GridView } from "../Views/Grid";
import { ODataColumnView } from "./ODataColumnView";
import { ODataHeaderRowView } from "./ODataHeaderRowView";

export class ODataGridView extends GridView {
    constructor(container: BasicComponentView) {
        super(container);
        this.setViewName(ODataGridView.name);
        this.setMargin(MarginCss.xs(0));
    }

    addHeaderRow(columns: ODataColumnView[]) {
        const row = this.addRow(ODataHeaderRowView);
        row.setContext(ContextualClass.secondary);
        row.setTextCss(new TextCss().bold());
        for (const col of columns) {
            const cell = row.addCell(col.headerCellCtor);
            col.configureHeaderCell(cell);
        }
        return row;
    }

    addDataRow(columns: ODataColumnView[]) {
        const row = this.addRow();
        for (const col of columns) {
            const cell = row.addCell(col.dataCellCtor);
            col.configureDataCell(cell);
        }
        return row;
    }

    setSelectedTemplateColumns(columns: ODataColumnView[]) {
        const templateColumns = new MappedArray(
            columns,
            col => col.width
        ).value();
        this.setTemplateColumns(...templateColumns);
    }
}