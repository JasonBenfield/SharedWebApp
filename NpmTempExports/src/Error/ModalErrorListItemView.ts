import { ColumnCss } from "../ColumnCss";
import { Column } from "../Grid/Column";
import { Row } from "../Grid/Row";
import { TextBlockView } from "../Html/TextBlockView";
import { LinkListGroupItemView } from "../ListGroup/LinkListGroupItemView";
import { LinkListItemViewModel } from "../ListGroup/LinkListItemViewModel";

export class ModalErrorListItemView extends LinkListGroupItemView {
    private readonly captionCol: Column;
    readonly caption: TextBlockView;
    readonly message: TextBlockView;

    constructor() {
        super(new LinkListItemViewModel());
        let row = this.addContent(new Row());
        this.captionCol = row.addColumn();
        this.captionCol.setColumnCss(ColumnCss.xs(3));
        this.caption = this.captionCol.addContent(new TextBlockView());
        let col2 = row.addColumn();
        this.message = col2.addContent(new TextBlockView());
    }

    hideCaption() { this.captionCol.hide(); }

    showCaption() { this.captionCol.show(); }
}