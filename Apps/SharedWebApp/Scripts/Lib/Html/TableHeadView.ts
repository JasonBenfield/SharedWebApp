import { EnumerableRange, MappedArray } from "../Enumerable";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableHeadViewModel } from "./TableHeadViewModel";
import { TableRowView } from "./TableRowView";

export class TableHeadView extends HtmlContainerComponent {
    protected readonly vm: TableHeadViewModel;

    constructor(vm: TableHeadViewModel = new TableHeadViewModel()) {
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