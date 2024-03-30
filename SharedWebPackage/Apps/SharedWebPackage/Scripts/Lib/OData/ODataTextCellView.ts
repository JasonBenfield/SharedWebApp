import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BasicGridRowView, GridCellView, GridRowView } from "../Views/Grid";
import { TextBlockView } from "../Views/TextBlockView";

export class ODataTextCellView extends GridCellView {
    constructor(rowView: BasicGridRowView) {
        super(rowView);
        this.value = this.addView(TextBlockView);
    }

    readonly value: BasicTextComponentView;
}