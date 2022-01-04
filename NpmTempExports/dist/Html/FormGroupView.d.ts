import { Column } from "../Grid/Column";
import { LabelColumn } from "../Grid/LabelColumn";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { TextSpanView } from "../Html/TextSpanView";
export declare class FormGroupView extends Block {
    readonly captionColumn: LabelColumn;
    readonly caption: TextSpanView;
    readonly valueColumn: Column;
    constructor(vm?: BlockViewModel);
}
