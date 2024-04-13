import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextMarkView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'mark');
    }
}