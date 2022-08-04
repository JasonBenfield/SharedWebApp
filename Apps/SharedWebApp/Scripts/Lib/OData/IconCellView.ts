import { FaIconView } from "../Views/FaIconView";
import { GridCellView, GridRowView } from "../Views/Grid";

export class IconCellView extends GridCellView {
    constructor(row: GridRowView) {
        super(row);
        this.icon = this.addView(FaIconView);
    }

    readonly icon: FaIconView;
}