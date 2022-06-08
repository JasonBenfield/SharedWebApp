import { EnumerableRange, MappedArray } from "../Enumerable";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableDataView } from "./TableDataView";
import { TableDataHeaderView } from "./TableDataHeaderView";
import { TableRowViewModel } from "./TableRowViewModel";

export class TableRowView extends HtmlContainerComponent {
    protected readonly vm: TableRowViewModel;

    constructor(vm: TableRowViewModel = new TableRowViewModel()) {
        super(vm);
    }

    addTableCell() {
        return this.addTableCells(1)[0];
    }

    addTableCells(howMany: number) {
        let cells = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new TableDataView()
        ).value();
        for (let cell of cells) {
            this.addContent(cell);
        }
        return cells;
    }

    addHeader() {
        return this.addHeaders(1)[0];
    }

    addHeaders(howMany: number) {
        let headers = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new TableDataHeaderView()
        ).value();
        for (let header of headers) {
            this.addContent(header);
        }
        return headers;
    }
}