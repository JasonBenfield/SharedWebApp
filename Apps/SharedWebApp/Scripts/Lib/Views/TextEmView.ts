import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextEmView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'em');
    }
}