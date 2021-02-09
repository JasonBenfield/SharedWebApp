import { Column } from "../Grid/Column";
import { LabelColumn } from "../Grid/LabelColumn";
import { Block } from "../Html/Block";
import { BlockViewModel } from "../Html/BlockViewModel";
import { InputGroup } from "../Html/InputGroup";
import { TextSpan } from "../Html/TextSpan";
import { MarginCss } from "../MarginCss";

export class FormGroup extends Block implements IFormGroup {
    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('form-group row');
        this.setMargin(MarginCss.bottom(3));
        this.inputGroup = this.valueColumn.addContent(new InputGroup());
    }

    readonly captionColumn = this.addContent(new LabelColumn());
    private readonly labelTextSpan = this.captionColumn.addContent(new TextSpan());
    readonly inputGroup: InputGroup;

    private caption: string;

    getCaption() {
        return this.caption;
    }

    setCaption(caption: string) {
        this.caption = caption;
        this.labelTextSpan.setText(caption);
    }

    readonly valueColumn = this.addContent(new Column());
}