import { BasicTextComponentView } from "./BasicTextComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView } from "./Types";

export class TextBlockView extends BasicTextComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'div'));
    }
}