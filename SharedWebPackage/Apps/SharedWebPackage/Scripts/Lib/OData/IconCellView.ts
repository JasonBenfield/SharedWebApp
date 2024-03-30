import { FaIconView } from "../Views/FaIconView";
import { BasicGridRowView, GridCellView } from "../Views/Grid";

export class IconCellView extends GridCellView {
    constructor(row: BasicGridRowView) {
        super(row);
        this.icon = this.addView(FaIconView);
    }

    readonly icon: FaIconView;
}