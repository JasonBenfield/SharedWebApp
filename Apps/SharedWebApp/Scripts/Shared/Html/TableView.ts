import { EnumerableRange, MappedArray } from "../Enumerable";
import { ColGroupView } from "./ColGroupView";
import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableBodyView } from "./TableBodyView";
import { TableCaptionView } from "./TableCaptionView";
import { TableFootView } from "./TableFootView";
import { TableHeadView } from "./TableHeadView";
import { TableRowView } from "./TableRowView";
import { TableViewModel } from "./TableViewModel";

export class TableView extends HtmlContainerComponent {
    protected readonly vm: TableViewModel;

    constructor(vm: TableViewModel = new TableViewModel()) {
        super(vm);
    }

    addCaption() { return this.addContent(new TableCaptionView()); }

    addColGroup() { this.addContent(new ColGroupView()); }

    addHead() { this.addContent(new TableHeadView()); }

    addBody() { this.addContent(new TableBodyView()); }

    addFoot() { this.addContent(new TableFootView()); }

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