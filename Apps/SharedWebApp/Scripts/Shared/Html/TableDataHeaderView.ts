import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableDataHeaderViewModel } from "./TableDataHeaderViewModel";

export class TableDataHeaderView extends HtmlContainerComponent {
    protected readonly vm: TableDataHeaderViewModel;

    constructor(vm: TableDataHeaderViewModel = new TableDataHeaderViewModel()) {
        super(vm);
    }

    setColSpan(colspan: number) {
        this.vm.colspan(colspan.toString());
    }

    setRowSpan(rowspan: number) {
        this.vm.rowspan(rowspan.toString());
    }

    setHeaders(headers: string) {
        this.vm.headers(headers);
    }
}