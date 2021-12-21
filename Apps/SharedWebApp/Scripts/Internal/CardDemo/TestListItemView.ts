import { Row } from "../../Shared/Grid/Row";
import { TextBlock } from "../../Shared/Html/TextBlock";
import { ListGroupItemView } from "../../Shared/ListGroup/ListGroupItemView";

export class TestListItemView extends ListGroupItemView {
    private readonly text: TextBlock;

    constructor() {
        super();
        let row = this.addContent(new Row());
        this.text = row.addColumn().addContent(new TextBlock());
    }

    setText(text: string) {
        this.text.setText(text);
    }
}