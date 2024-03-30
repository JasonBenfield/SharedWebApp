import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class SpanView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'span');
    }
}