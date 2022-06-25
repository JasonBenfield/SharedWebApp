import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";
import { ILinkAttributes, IContainerView } from "./Types";

export class LinkView extends BasicContainerView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'a'));
    }

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }

    handleClick(action: () => void) {
        this.on('click').execute(action).subscribe();
    }

}