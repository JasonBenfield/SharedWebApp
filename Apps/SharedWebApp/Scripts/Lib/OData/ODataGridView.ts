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

    addHeaderRow(howManyColumns: number) {
        let row = this.addRow(howManyColumns);
        row.setContext(ContextualClass.secondary);
        row.addCssName('fw-bold');
        for (let cell of row.getCells()) {
            cell.stickyAtTop();
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