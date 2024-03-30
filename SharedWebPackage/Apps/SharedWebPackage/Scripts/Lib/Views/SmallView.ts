import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class SmallView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'small');
    }
}