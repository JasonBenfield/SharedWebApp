import { BasicComponentView } from "../Views/BasicComponentView";
import { FaIconView } from "../Views/FaIconView";
import { GridCellView } from "../Views/Grid";

export class IconCellView extends GridCellView {
    constructor(container: BasicComponentView) {
        super(container);
        this.icon = this.addView(FaIconView);
    }

    readonly icon: FaIconView;
}