import { BasicComponentView } from "./BasicComponentView";

export class HorizontalRuleView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'hr');
    }
}