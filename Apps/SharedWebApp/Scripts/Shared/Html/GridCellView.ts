import { Block } from "./Block";
import { GridCellViewModel } from "./GridCellViewModel";

export class GridCellView extends Block {
    static header(vm: GridCellViewModel = new GridCellViewModel()) {
        return new GridCellView(vm).configure(c => c.addCssName('grid-header'));
    }

    static footer(vm: GridCellViewModel = new GridCellViewModel()) {
        return new GridCellView(vm).configure(c => c.addCssName('grid-footer'));
    }

    protected readonly vm: GridCellViewModel;

    constructor(vm: GridCellViewModel = new GridCellViewModel()) {
        super(vm);
    }

    fixedLeft() {
        this.addCssName('grid-fixed-left');
    }

    fixedRight() {
        this.addCssName('grid-fixed-right');
    }

    setColumn(start: number, end?: number) {
        this.vm.gridColumn(this.rangeValue(start, end));
    }

    setRow(start: number, end?: number) {
        this.vm.gridRow(this.rangeValue(start, end));
    }

    private rangeValue(start: number, end: number) {
        let range = start.toString();
        if (end) {
            range += ` / ${end}`;
        }
        return range;
    }
}