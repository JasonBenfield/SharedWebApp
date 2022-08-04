import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ILinkAttributes, ILinkView } from "./Types";

export class LinkView extends BasicContainerView implements ILinkView {
    constructor(container: BasicComponentView) {
        super(container, 'a');
    }

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }

    handleClick(action: () => void) {
        this.on('click').execute(action).subscribe();
    }

}