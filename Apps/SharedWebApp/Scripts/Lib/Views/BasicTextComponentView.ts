import { BasicComponentView } from "./BasicComponentView";
import { IHtmlElementView } from "./Types";

export class BasicTextComponentView extends BasicComponentView {
    constructor(container: BasicComponentView, element: IHtmlElementView) {
        super(container, element);
    }

    setText(text: string) { this.elementView.setText(text); }
}