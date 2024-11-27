import { ContextualClass } from "../../Lib/ContextualClass";
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

    styleAsHeader() {
        this.cell1.setText("Header 1");
        this.cell2.setText("Header 2");
        this.cell3.setText("Header 3");
        this.setContext(ContextualClass.primary);
    }

    styleAsFooter() {
        this.cell1.setText("Footer 1");
        this.cell2.setText("Footer 2");
        this.cell3.setText("Footer 3");
        this.setContext(ContextualClass.secondary);
    }
}