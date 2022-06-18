import { ContextualClass } from "../ContextualClass";
import { EnumerableRange, MappedArray } from "../Enumerable";
import { Block } from "./Block";
import { BlockViewModel } from "./BlockViewModel";
import { GridCellView } from "./GridCellView";

export class GridRowView extends Block {
    private context: ContextualClass;
    private readonly cells: GridCellView[] = [];

    constructor(vm?: BlockViewModel) {
        super(vm);
        this.addCssName('d-contents');
        this.addCssName('grid-row');
    }

    stickyAtTop() {
        this.addCssName('position-sticky-top');
    }

    stickyAtBottom() {
        this.addCssName('position-sticky-bottom');
    }

    setContext(context: ContextualClass) {
        const contextCss = context ? context.append('grid-row') : '';
        this.replaceCssName(this.context ? this.context.append('grid-row') : '', contextCss);
        this.context = context;
    }

    addCell() {
        return this.addCells(1)[0];
    }

    addCells(howMany: number) {
        let cells = new MappedArray(
            new EnumerableRange(1, howMany),
            () => new GridCellView(this)
        ).value();
        for (const cell of cells) {
            this.addContent(cell);
            this.cells.push(cell);
        }
        return cells;
    }

    cell(index: number) { return this.cells[index]; }

    getCells() { return this.cells; }
}