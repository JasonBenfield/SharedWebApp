import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView } from "./Types";

export class IconView extends BasicComponentView {
    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'i'));
    }
}