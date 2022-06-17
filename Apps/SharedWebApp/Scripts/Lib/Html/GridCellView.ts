import { Block } from "./Block";
import { GridCellViewModel } from "./GridCellViewModel";

export class GridCellView extends Block {
    protected readonly vm: GridCellViewModel;

    constructor(vm: GridCellViewModel = new GridCellViewModel()) {
        super(vm);
        this.addCssName('grid-cell');
    }

    protected setStyle: (config: (style: IGridCellStyle) => void) => void;

    stickyAtTop() {
        this.addCssName('position-sticky-top');
    }

    stickyAtBottom() {
        this.addCssName('position-sticky-bottom');
    }

    stickyAtLeft() {
        this.addCssName('position-sticky-left');
    }

    stickyAtRight() {
        this.addCssName('positiion-sticky-right');
    }

    setColumn(start: number, end?: number) {
        this.setStyle(style => style["grid-column"] = this.rangeValue(start, end));
    }

    setRow(start: number, end?: number) {
        this.setStyle(style => style["grid-row"] = this.rangeValue(start, end));
    }

    private rangeValue(start: number, end: number) {
        let range = start.toString();
        if (end) {
            range += ` / ${end}`;
        }
        return range;
    }
}