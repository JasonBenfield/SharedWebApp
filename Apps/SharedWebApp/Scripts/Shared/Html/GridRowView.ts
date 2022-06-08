import { EnumerableRange, MappedArray } from "../Enumerable";
import { Block } from "./Block";
import { BlockViewModel } from "./BlockViewModel";
import { GridCellView } from "./GridCellView";

export class GridRowView extends Block {
    constructor(vm?: BlockViewModel) {
        super(vm);
        this.addCssName('d-contents');
    }

    addHeader() {
        return this.addHeaders(1)[0];
    }

    addHeaders(howMany: number) {
        let headers = new MappedArray(
            new EnumerableRange(1, howMany),
            i => GridCellView.header()
        ).value();
        for (let cell of headers) {
            this.addContent(cell);
        }
        return headers;
    }

    addCell() {
        return this.addCells(1)[0];
    }

    addCells(howMany: number) {
        let cells = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new GridCellView()
        ).value();
        for (let cell of cells) {
            this.addContent(cell);
        }
        return cells;
    }

    addFooter() {
        return this.addFooters(1)[0];
    }

    addFooters(howMany: number) {
        let footers = new MappedArray(
            new EnumerableRange(1, howMany),
            i => GridCellView.footer()
        ).value();
        for (let footer of footers) {
            this.addContent(footer);
        }
        return footers;
    }

}