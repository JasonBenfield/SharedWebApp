import { Column } from "../Grid/Column";
import { LabelColumn } from "../Grid/LabelColumn";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { TextSpanView } from "../Html/TextSpanView";
import { MarginCss } from "../MarginCss";

export class FormGroupView extends Block {
    readonly captionColumn = this.addContent(new LabelColumn());
    readonly caption = this.captionColumn.addContent(new TextSpanView());
    readonly valueColumn = this.addContent(new Column());

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('form-group row');
        this.setMargin(MarginCss.bottom(3));
    }
}