import { LabelView } from "./LabelView";
import { LabelViewModel } from './LabelViewModel';
import { TextSpanView } from "./TextSpanView";

export class TextLabel extends LabelView implements ITextComponentView {
    readonly textSpan: TextSpanView;

    constructor(vm: LabelViewModel = new LabelViewModel()) {
        super(vm);
        this.textSpan = this.addContent(new TextSpanView());
    }

    setText(text: string) { this.textSpan.setText(text); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}