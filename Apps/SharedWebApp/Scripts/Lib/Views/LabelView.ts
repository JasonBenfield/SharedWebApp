import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";
import { ILabelAttributes, IContainerView } from "./Types";

export class LabelView extends BasicContainerView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'label'));
    }

    protected setAttr: (config: (attr: ILabelAttributes) => void) => void;

    setFor(forTarget: string) {
        this.setAttr(attr => attr.for = forTarget);
    }

}