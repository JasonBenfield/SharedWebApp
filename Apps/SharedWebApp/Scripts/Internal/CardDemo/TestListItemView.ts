import { Row } from "../../Shared/Grid/Row";
import { TextBlockView } from "../../Shared/Html/TextBlockView";
import { ListGroupItemView } from "../../Shared/ListGroup/ListGroupItemView";

export class TestListItemView extends ListGroupItemView {
    readonly text: TextBlockView;

    constructor() {
        super();
        let row = this.addContent(new Row());
        this.text = row.addColumn().addContent(new TextBlockView());
    }
}