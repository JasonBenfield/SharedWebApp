import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextBlockView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
    }

    styleAsFormControl() {
        this.addCssName('form-control-plaintext');
    }
}