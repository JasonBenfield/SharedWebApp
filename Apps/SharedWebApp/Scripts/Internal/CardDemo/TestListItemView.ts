import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { ListGroupItemView } from "../../Lib/Views/ListGroup";
import { RowView } from "../../Lib/Views/RowView";
import { TextBlockView } from "../../Lib/Views/TextBlockView";

export class TestListItemView extends ListGroupItemView {
    readonly text: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        const row = this.addView(RowView);
        this.text = row.addColumn().addView(TextBlockView);
    }
}