import { ColumnCss } from "../ColumnCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { ColumnView } from "./ColumnView";
import { RowView } from "./RowView";

export class ToolbarView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        const containerBlock = this.addView(BlockView);
        containerBlock.addCssName('container');
        const row = containerBlock.addView(RowView);
        this.columnStart = row.addColumn()
            .configure(c => {
                c.setColumnCss(ColumnCss.xs())
            });
        this.columnMiddle = row.addColumn()
            .configure(c => {
                c.setColumnCss(ColumnCss.xs('auto'))
            });
        this.columnEnd = row.addColumn()
            .configure(c => {
                c.setColumnCss(ColumnCss.xs('auto'))
            });
    }

    readonly columnStart: ColumnView;
    readonly columnMiddle: ColumnView;
    readonly columnEnd: ColumnView;
}