import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { ILinkAttributes, ILinkView, TargetValue } from "./Types";

export class TextLinkView extends BasicTextComponentView implements ILinkView {
    constructor(container: BasicComponentView) {
        super(container, 'a');
    }

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }

    setTarget(target: TargetValue) {
        this.setAttr(attr => attr.target = target);
    }

}