import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";

export class TextPreView extends BasicTextComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'pre');
    }
}