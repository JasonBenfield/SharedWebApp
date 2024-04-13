import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { FaIconView } from "./FaIconView";
import { ILinkAttributes, ILinkView, TargetValue } from "./Types";

export class LinkView extends BasicContainerView implements ILinkView {
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

    handleClick(action: () => void) {
        this.on('click').execute(action).subscribe();
    }

    addIcon() {
        return this.addView(FaIconView);
    }

    prependIcon() {
        return this.insertView(0, FaIconView);
    }
}