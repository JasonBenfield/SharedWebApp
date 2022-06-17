import { EnumerableRange, MappedArray } from "../Enumerable";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableFootViewModel } from "./TableFootViewModel";
import { TableRowView } from "./TableRowView";

export class TableFootView extends HtmlContainerComponent {
    protected readonly vm: TableFootViewModel;

    constructor(vm: TableFootViewModel = new TableFootViewModel()) {
        super(vm);
    }

    addRow() {
        return this.addRows(1)[0];
    }

    addRows(howMany: number) {
        let rows = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new TableRowView()
        ).value();
        for (let row of rows) {
            this.addContent(row);
        }
        return rows;
    }
}