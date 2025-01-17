import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { CardView } from "../../Lib/Views/Card";
import { GridListGroupView } from "../../Lib/Views/ListGroup";
import { TextBlockView } from "../../Lib/Views/TextBlockView";
import { TestGridListItemView } from "./TestGridListItemView";

export class TestCard2View extends CardView {
    readonly gridItems: GridListGroupView<TestGridListItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        this.addCardBody().addView(TextBlockView).setText("Grid should be flush");
        this.gridItems = this.addGridListGroup(TestGridListItemView);
        TestGridListItemView.setTemplateColumns(this.gridItems);
        //this.addCardBody().addView(TextBlockView).setText("Grid should be flush");
    }
}