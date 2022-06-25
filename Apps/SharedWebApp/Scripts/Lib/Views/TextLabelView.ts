
import { BasicTextComponentView } from "./BasicTextComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { ILabelAttributes, IContainerView } from "./Types";

export class TextLabelView extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'a'));
    }

    protected setAttr: (config: (attr: ILabelAttributes) => void) => void;

    setFor(forTarget: string) {
        this.setAttr(attr => attr.for = forTarget);
    }
}