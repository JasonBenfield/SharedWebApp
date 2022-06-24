import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";

let body: BodyView;

export class BodyView extends BasicContainerView {
    static get instance() {
        if (!body) {
            body = new BodyView();
        }
        return body;
    }

    constructor() {
        super(HtmlElementView.body());
    }
}