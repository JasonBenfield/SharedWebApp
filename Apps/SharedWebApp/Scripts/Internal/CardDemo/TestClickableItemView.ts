import { ColumnCss } from "../../Shared/ColumnCss";
import { ContextualClass } from "../../Shared/ContextualClass";
import { Row } from "../../Shared/Grid/Row";
import { TextBlock } from "../../Shared/Html/TextBlock";
import { ButtonListGroupItemView } from "../../Shared/ListGroup/ButtonListGroupItemView";
import { ButtonListItemViewModel } from "../../Shared/ListGroup/ButtonListItemViewModel";

export class TestClickableListItemView extends ButtonListGroupItemView {
    private readonly text: TextBlock;

    constructor() {
        super(new ButtonListItemViewModel());
        let row = this.addContent(new Row());
        let iconColumn = row.addIconColumn(
            'thumbs-up',
            icon => {
                icon.makeFixedWidth();
                icon.setColor(ContextualClass.success);
            }
        );
        iconColumn.setColumnCss(ColumnCss.xs('auto'));
        this.text = row.addColumn()
            .addContent(new TextBlock());
    }

    setText(text: string) {
        this.text.setText(text);
    }
}