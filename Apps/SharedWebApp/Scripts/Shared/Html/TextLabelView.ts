import { Label } from "./Label";
import { LabelViewModel } from './LabelViewModel';
import { TextSpanView } from "./TextSpanView";

export class TextLabel extends Label implements ITextComponentView {
    readonly textSpan: TextSpanView;

    constructor(vm: LabelViewModel = new LabelViewModel()) {
        super(vm);
        this.textSpan = this.addContent(new TextSpanView());
    }

    setText(text: string) { this.textSpan.setText(text); }

    setHtml(html: string) { this.textSpan.setHtml(html); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}