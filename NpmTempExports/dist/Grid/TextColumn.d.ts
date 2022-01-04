import { ColumnCss } from "../ColumnCss";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { TextSpanView } from "../Html/TextSpanView";
export declare class TextColumn extends Block {
    protected readonly vm: BlockViewModel;
    readonly textSpan: TextSpanView;
    private columnCss;
    constructor(vm?: BlockViewModel);
    setColumnCss(columnCss: ColumnCss): void;
}
