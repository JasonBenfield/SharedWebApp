import { FaIcon } from "../FaIcon";
import { GridCellView } from "../Html/GridCellView";
import { ODataColumnStyle } from "./ODataColumnStyle";

export class IconCellLayoutView {
    constructor(view: GridCellView, style: ODataColumnStyle) {
        style.apply(view);
        this.icon = view.addContent(new FaIcon());
    }

    readonly icon: FaIcon;
}