import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableDataViewModel } from "./TableDataViewModel";

export class TableDataView extends HtmlContainerComponent {
    protected readonly vm: TableDataViewModel;

    constructor(vm: TableDataViewModel = new TableDataViewModel()) {
        super(vm);
    }

    protected setAttr: (config: (attr: ITableDataAttributes) => void) => void;

    setColSpan(colspan: number) {
        this.setAttr((attr) => attr.colspan = colspan.toString());
    }

    setRowSpan(rowspan: number) {
        this.setAttr((attr) => attr.rowspan = rowspan.toString());
    }

    setHeaders(headers: string) {
        this.setAttr((attr) => attr.headers = headers);
    }
}