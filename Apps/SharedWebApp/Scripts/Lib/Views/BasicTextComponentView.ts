import { BasicComponentView } from "./BasicComponentView";
import { IHtmlElementView, ITextComponentView } from "./Types";

export class BasicTextComponentView extends BasicComponentView implements ITextComponentView {
    constructor(container: BasicComponentView, element: IHtmlElementView) {
        super(container, element);
    }

    setText(text: string) { this.elementView.setText(text); }
}