import { ContextualClass } from "../ContextualClass";
import { GridView } from "../Html/GridView";
import { MarginCss } from "../MarginCss";

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
}