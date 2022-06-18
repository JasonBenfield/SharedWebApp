import { FaIcon } from "../FaIcon";
import { GridCellView } from "../Html/GridCellView";
import { IconCellLayoutView } from "./IconCellLayoutView";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnStyle } from "./ODataColumnStyle";
import { ICellLayout } from "./Types";

export class IconCellLayout implements ICellLayout {
    constructor(
        private readonly configureIcon: (icon: FaIcon) => void = () => { },
        private readonly style = new ODataColumnStyle()
    ) {
    }

    execute(cellView: GridCellView, column: ODataColumn, record?: any) {
        const layoutView = new IconCellLayoutView(cellView, this.style);
        this.configureIcon(layoutView.icon)
    }
}