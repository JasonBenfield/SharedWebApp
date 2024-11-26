import { ColumnCss } from "../../Lib/ColumnCss";
import { ContextualClass } from "../../Lib/ContextualClass";
import { RowView } from "../../Lib/Views/RowView";
import { TextBlockView } from "../../Lib/Views/TextBlockView";
import { BasicComponentView } from "../../Lib/Views/BasicComponentView";
import { ButtonListGroupItemView, ListGroupItemView } from "../../Lib/Views/ListGroup";

export class TestClickableListHeaderView extends ListGroupItemView {
    readonly text: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addView(TextBlockView).setText("List Header");
        this.setContext(ContextualClass.primary);
    }
}

export class TestClickableListFooterView extends ListGroupItemView {
    readonly text: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.addView(TextBlockView).setText("List Footer");
        this.setContext(ContextualClass.secondary);
    }
}

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