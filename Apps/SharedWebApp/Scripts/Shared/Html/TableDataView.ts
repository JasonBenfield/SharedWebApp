import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableDataViewModel } from "./TableDataViewModel";

export class TableDataView extends HtmlContainerComponent {
    protected readonly vm: TableDataViewModel;

    constructor(vm: TableDataViewModel = new TableDataViewModel()) {
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