import { LinkView } from "./LinkView";
import { LinkViewModel } from "./LinkViewModel";
import { TextSpanView } from "./TextSpanView";

export class TextLinkView extends LinkView implements ITextComponentView {
    readonly textSpan: TextSpanView;

    constructor(vm: LinkViewModel = new LinkViewModel()) {
        super(vm);
        this.textSpan = this.addContent(new TextSpanView());
    }

    setText(text: string) { this.textSpan.setText(text); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}