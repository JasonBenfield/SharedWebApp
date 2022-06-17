import { ColumnCss } from "../../Lib/ColumnCss";
import { ContextualClass } from "../../Lib/ContextualClass";
import { Row } from "../../Lib/Grid/Row";
import { TextBlockView } from "../../Lib/Html/TextBlockView";
import { ButtonListGroupItemView } from "../../Lib/ListGroup/ButtonListGroupItemView";
import { ButtonListItemViewModel } from "../../Lib/ListGroup/ButtonListItemViewModel";

export class TestClickableListItemView extends ButtonListGroupItemView {
    readonly text: TextBlockView;

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
            .addContent(new TextBlockView());
    }
}