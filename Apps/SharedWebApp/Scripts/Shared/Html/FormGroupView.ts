import { Column } from "../Grid/Column";
import { LabelColumn } from "../Grid/LabelColumn";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { InputGroup } from "../Html/InputGroup";
import { TextSpan } from "../Html/TextSpan";
import { MarginCss } from "../MarginCss";

export class FormGroupView extends Block {
    readonly captionColumn = this.addContent(new LabelColumn());
    private readonly labelTextSpan = this.captionColumn.addContent(new TextSpan());
    readonly inputGroup: InputGroup;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('form-group row');
        this.setMargin(MarginCss.bottom(3));
        this.inputGroup = this.valueColumn.addContent(new InputGroup());
    }

    setCaption(caption: string) {
        this.labelTextSpan.setText(caption);
    }

    readonly valueColumn = this.addContent(new Column());
}