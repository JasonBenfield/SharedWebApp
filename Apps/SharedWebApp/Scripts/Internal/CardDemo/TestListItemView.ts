import { Row } from "../../Lib/Grid/Row";
import { TextBlockView } from "../../Lib/Html/TextBlockView";
import { ListGroupItemView } from "../../Lib/ListGroup/ListGroupItemView";

export class TestListItemView extends ListGroupItemView {
    readonly text: TextBlockView;

    constructor() {
        super();
        let row = this.addContent(new Row());
        this.text = row.addColumn().addContent(new TextBlockView());
    }
}