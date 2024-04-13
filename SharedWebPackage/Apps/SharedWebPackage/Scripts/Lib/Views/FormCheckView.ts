import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { BooleanInputView } from "./BooleanInputView";
import { LabelView } from "./LabelView";
import { TextBlockView } from "./TextBlockView";

export class FormCheckView extends BasicComponentView {
    readonly input: BooleanInputView;
    readonly label: LabelView;
    readonly labelText: BasicTextComponentView;

    constructor(container: BasicContainerView) {
        super(container, 'div');
        this.addCssName('form-check');
        this.input = this.addView(BooleanInputView);
        this.input.addCssName('form-check-input');
        this.label = this.addView(LabelView);
        this.label.addCssName('form-check-label');
        this.labelText = this.label.addView(TextBlockView);
    }

    styleAsSwitch() {
        this.addCssName('form-switch');
    }

    inline() {
        this.addCssName('form-check-inline');
    }

    asReverse() {
        this.addCssName('form-check-reverse');
    }

    setInputID(id: string) {
        this.input.setViewID(id);
        this.label.setFor(id);
    }
}