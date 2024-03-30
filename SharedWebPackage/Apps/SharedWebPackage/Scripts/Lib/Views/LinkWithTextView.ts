import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { LinkView } from "./LinkView";
import { TextSpanView } from "./TextSpanView";
import { ITextComponentView } from "./Types";

export class LinkWithTextView extends LinkView implements ITextComponentView {
    readonly textView: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.textView = this.addView(TextSpanView);
    }

    getText() { return this.textView.getText(); }

    setText(text: string) { return this.textView.setText(text); }
}