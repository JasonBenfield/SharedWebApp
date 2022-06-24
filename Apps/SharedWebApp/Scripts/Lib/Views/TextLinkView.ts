import { BasicTextComponentView } from "./BasicTextComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView, ILinkAttributes } from "./Types";

export class TextLinkView extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'a'));
    }

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }
}