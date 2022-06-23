import { NavLinkView } from "./NavLinkView";
import { TextBlockView } from "./TextBlockView";

export class TextNavLinkView extends NavLinkView implements ITextComponentView {
    private readonly text: ITextComponentView;

    constructor() {
        super();
        this.text = this.addContent(new TextBlockView());
    }

    setText(text: string) {
        this.text.setText(text);
    }
}