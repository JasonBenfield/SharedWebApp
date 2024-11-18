import { CssLengthUnit } from "../../Lib/CssLengthUnit";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { BasicTextComponentView } from "../../Lib/Views/BasicTextComponentView";
import { FormGroupGridListGroupView } from "../../Lib/Views/FormGroupGridListGroupView";
import { GridListGroupItemView, GridListGroupView } from "../../Lib/Views/ListGroup";
import { TextBlockView } from "../../Lib/Views/TextBlockView";

export class TestGridListItemView extends GridListGroupItemView {
    readonly cell1: BasicTextComponentView;
    readonly cell2: BasicTextComponentView;
    readonly cell3: BasicTextComponentView;

    static setTemplateColumns(list: GridListGroupView<TestGridListItemView> | FormGroupGridListGroupView<TestGridListItemView>) {
        list.setTemplateColumns(
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1),
            CssLengthUnit.flex(1)
        );
    }

    constructor(container: BasicComponentView) {
        super(container);
        this.cell1 = this.addCell().addView(TextBlockView);
        this.cell2 = this.addCell().addView(TextBlockView);
        this.cell3 = this.addCell().addView(TextBlockView);
    }
}