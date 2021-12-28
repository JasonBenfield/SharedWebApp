import { BlockViewModel } from "./BlockViewModel";
import { PlainTextFormGroupView } from "./PlainTextFormGroupView";
import { TextBlockView } from "./TextBlockView";

export class TextValueFormGroupView extends PlainTextFormGroupView {
    readonly valueText: TextBlockView;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.valueText = this.valueColumn.addContent(new TextBlockView());
    }
}