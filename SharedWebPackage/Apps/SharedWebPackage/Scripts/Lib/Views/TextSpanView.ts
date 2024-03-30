import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextSpanView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'span');
    }
}