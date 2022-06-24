import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";

export class BasicTextComponentView extends BasicComponentView {
    constructor(elementView: HtmlElementView) {
        super(elementView);
    }

    setText(text: string) { this.elementView.setText(text); }
}