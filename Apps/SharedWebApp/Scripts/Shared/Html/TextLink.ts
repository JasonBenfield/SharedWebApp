import { Link } from "./Link";
import { TextBlock } from "./TextBlock";
import { TextLinkView } from "./TextLinkView";

export class TextLink extends Link {
    private readonly text: TextBlock;

    constructor(text: string, view: TextLinkView) {
        super(view);
        this.text = new TextBlock(text, view.textSpan);
    }

    setText(text: string) {
        this.text.setText(text);
    }

    setTitle(title: string) { this.text.setTitle(title); }

    syncTitleWithText(format?: (text: string) => string) {
        this.text.syncTitleWithText(format);
    }
}