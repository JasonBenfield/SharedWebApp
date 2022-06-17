import { ColumnCss } from "../ColumnCss";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { TextSpanView } from "../Html/TextSpanView";

export class TextColumn extends Block {
    protected readonly vm: BlockViewModel;
    readonly textSpan: TextSpanView;
    private columnCss: ColumnCss;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.setColumnCss(ColumnCss.xs());
        this.addCssName('col-form-label');
        this.textSpan = this.addContent(new TextSpanView());
    }

    setColumnCss(columnCss: ColumnCss) {
        this.replaceCssName(
            this.columnCss && this.columnCss.toString(),
            columnCss && columnCss.toString()
        );
    }
}