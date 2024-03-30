import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { BasicTextComponentView } from "../../Lib/Views/BasicTextComponentView";
import { GridLinkListGroupItemView } from "../../Lib/Views/ListGroup";
import { TextBlockView } from "../../Lib/Views/TextBlockView";

export class TestGridLinkListItemView extends GridLinkListGroupItemView {
    readonly cell1: BasicTextComponentView;
    readonly cell2: BasicTextComponentView;
    readonly cell3: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.cell1 = this.addCell().addView(TextBlockView);
        this.cell2 = this.addCell().addView(TextBlockView);
        this.cell3 = this.addCell().addView(TextBlockView);
    }
}