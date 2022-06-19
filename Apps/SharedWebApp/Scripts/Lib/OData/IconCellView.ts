import { FaIcon } from "../FaIcon";
import { GridCellView } from "../Html/GridCellView";
import { GridCellViewModel } from "../Html/GridCellViewModel";
import { GridRowView } from "../Html/GridRowView";

export class IconCellView extends GridCellView {
    constructor(row: GridRowView, vm?: GridCellViewModel) {
        super(row, vm);
        this.icon = this.addContent(new FaIcon());
    }

    readonly icon: FaIcon;
}