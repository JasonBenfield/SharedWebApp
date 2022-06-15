import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableDataHeaderViewModel } from "./TableDataHeaderViewModel";

export class TableDataHeaderView extends HtmlContainerComponent {
    protected readonly vm: TableDataHeaderViewModel;

    constructor(vm: TableDataHeaderViewModel = new TableDataHeaderViewModel()) {
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