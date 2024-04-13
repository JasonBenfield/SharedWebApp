import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { ILabelAttributes, ILabelView } from "./Types";

export class TextLabelView extends BasicTextComponentView implements ILabelView {
    constructor(container: BasicComponentView) {
        super(container, 'label');
    }

    protected setAttr: (config: (attr: ILabelAttributes) => void) => void;

    setFor(forTarget: string) {
        this.setAttr(attr => attr.for = forTarget);
    }
}