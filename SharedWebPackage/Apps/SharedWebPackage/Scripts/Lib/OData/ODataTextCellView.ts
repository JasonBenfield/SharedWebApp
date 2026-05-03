import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { GridCellView } from "../Views/Grid";
import { TextBlockView } from "../Views/TextBlockView";

export class ODataTextCellView extends GridCellView {
    constructor(container: BasicComponentView) {
        super(container);
        this.value = this.addView(TextBlockView);
    }

    readonly value: BasicTextComponentView;
}