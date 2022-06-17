import { ColumnCss } from "../ColumnCss";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";

export class Column extends Block {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.setColumnCss(ColumnCss.xs());
    }

    private columnCss: ColumnCss;

    setColumnCss(columnCss: ColumnCss) {
        this.replaceCssName(
            this.columnCss && this.columnCss.toString(),
            columnCss && columnCss.toString()
        );
        this.columnCss = columnCss;
    }
}