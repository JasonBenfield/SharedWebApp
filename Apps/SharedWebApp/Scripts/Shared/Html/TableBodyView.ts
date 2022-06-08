import { EnumerableRange, MappedArray } from "../Enumerable";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableBodyViewModel } from "./TableBodyViewModel";
import { TableRowView } from "./TableRowView";

export class TableBodyView extends HtmlContainerComponent {
    protected readonly vm: TableBodyViewModel;

    constructor(vm: TableBodyViewModel = new TableBodyViewModel()) {
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