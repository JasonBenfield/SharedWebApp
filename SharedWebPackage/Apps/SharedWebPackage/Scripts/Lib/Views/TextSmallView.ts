import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextSmallView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'small');
    }
}