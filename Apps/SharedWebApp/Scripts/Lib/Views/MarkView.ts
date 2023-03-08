import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class MarkView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'mark');
    }
}