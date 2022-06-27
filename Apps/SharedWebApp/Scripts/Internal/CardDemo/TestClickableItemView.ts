import { ColumnCss } from "../../Lib/ColumnCss";
import { ContextualClass } from "../../Lib/ContextualClass";
import { RowView } from "../../Lib/Views/RowView";
import { TextBlockView } from "../../Lib/Views/TextBlockView";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { ButtonListGroupItemView } from "../../Lib/Views/ListGroup";

export class TestClickableListItemView extends ButtonListGroupItemView {
    readonly text: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        const row = this.addView(RowView);
        const iconColumn = row.addIconColumn(
            icon => {
                icon.solidStyle('thumbs-up');
                icon.makeFixedWidth();
                icon.setColor(ContextualClass.success);
            }
        );
        iconColumn.setColumnCss(ColumnCss.xs('auto'));
        this.text = row.addColumn().addView(TextBlockView);
    }
}