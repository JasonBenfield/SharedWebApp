import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextStrongView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'strong');
    }
}