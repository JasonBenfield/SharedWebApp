import { ColumnCss } from "../ColumnCss";
import { Column } from "../Grid/Column";
import { Row } from "../Grid/Row";
import { TextBlock } from "../Html/TextBlock";
import { LinkListGroupItemView } from "../ListGroup/LinkListGroupItemView";
import { LinkListItemViewModel } from "../ListGroup/LinkListItemViewModel";

export class ModalErrorListItemView extends LinkListGroupItemView {
    private readonly captionCol: Column;
    private readonly caption: TextBlock;
    private readonly message: TextBlock;

    constructor() {
        super(new LinkListItemViewModel());
        let row = this.addContent(new Row());
        this.captionCol = row.addColumn();
        this.captionCol.setColumnCss(ColumnCss.xs(3));
        this.caption = this.captionCol.addContent(new TextBlock());
        let col2 = row.addColumn();
        this.message = col2.addContent(new TextBlock());
    }

    hideCaption() { this.captionCol.hide(); }

    showCaption() { this.captionCol.show(); }

    setCaption(caption: string) { this.caption.setText(caption); }

    setMessage(message: string) { this.message.setText(message); }
}