import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { ILabelAttributes } from "./Types";

export class LabelView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'label');
    }

    protected setAttr: (config: (attr: ILabelAttributes) => void) => void;

    setFor(forTarget: string) {
        this.setAttr(attr => attr.for = forTarget);
    }

}