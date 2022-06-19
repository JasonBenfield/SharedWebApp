import { ContextualClass } from "../ContextualClass";
import { MappedArray } from "../Enumerable";
import { GridView } from "../Html/GridView";
import { MarginCss } from "../MarginCss";
import { ODataColumnView } from "./ODataColumnView";

export class ODataGridView extends GridView {
    constructor() {
        super();
        this.setMargin(MarginCss.xs(0));
    }

    addHeaderRow(columns: ODataColumnView[]) {
        const row = this.addRow();
        row.setContext(ContextualClass.secondary);
        row.addCssName('fw-bold');
        for (const col of columns) {
            row.addCell(r => col.createHeaderCellView(r))
        }
        return row;
    }

    addDataRow(columns: ODataColumnView[]) {
        const row = this.addRow();
        for (const col of columns) {
            row.addCell(r => col.createDataCellView(r))
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