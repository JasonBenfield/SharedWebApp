import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";

export class ListItemView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'li');
    }
}