import { ColumnCss } from "../ColumnCss";
import { Row } from "../Grid/Row";
import { TextBlock } from "../Html/TextBlock";
import { LinkListGroupItem } from "../ListGroup/LinkListGroupItemView";
import { LinkListItemViewModel } from "../ListGroup/LinkListItemViewModel";

export class ModalErrorListItemView extends LinkListGroupItem {
    private readonly caption: TextBlock;
    private readonly message: TextBlock;

    constructor() {
        super(new LinkListItemViewModel());
        let row = this.addContent(new Row());
        let col1 = row.addColumn();
        col1.setColumnCss(ColumnCss.xs(3));
        this.caption = col1.addContent(new TextBlock());
        let col2 = row.addColumn();
        this.message = col2.addContent(new TextBlock());
    }

    hideCaption() { this.caption.hide(); }

    showCaption() { this.caption.show(); }

    setCaption(caption: string) { this.caption.setText(caption); }

    setMessage(message: string) { this.message.setText(message); }
}