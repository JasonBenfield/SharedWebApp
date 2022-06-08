import { HtmlContainerComponent } from "./HtmlContainerComponent";
import { TableCaptionViewModel } from "./TableCaptionViewModel";

export class TableCaptionView extends HtmlContainerComponent {
    protected readonly vm: TableCaptionViewModel;

    constructor(vm: TableCaptionViewModel = new TableCaptionViewModel()) {
        super(vm);
    }
}