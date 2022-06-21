import { ColumnCss } from "../ColumnCss";
import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { ContextualClass } from "../ContextualClass";
import { Row } from "../Grid/Row";
import { Block } from "../Html/Block";
import { TextBlockView } from "../Html/TextBlockView";
import { TextSpanView } from "../Html/TextSpanView";
import { PaddingCss } from "../PaddingCss";

export class ODataFooterComponentView extends Block {
    private readonly pageButtonContainer: Block;
    private readonly contents: IComponent[] = [];
    readonly count: ITextComponentView;

    constructor() {
        super();
        this.setPadding(PaddingCss.xs(3));
        const row = this.addContent(new Row());
        const col1 = row.addColumn();
        this.pageButtonContainer = col1.addContent(new Block());
        this.pageButtonContainer.addCssName('btn-group');
        const col2 = row.addColumn();
        col2.setColumnCss(ColumnCss.xs('auto'));
        col2.addCssName('col-form-label');
        this.count = col2.addContent(new TextBlockView());
    }

    clearContents() {
        for (const view of this.contents) {
            this.pageButtonContainer.content.removeItem(view);
        }
        this.contents.splice(0, this.contents.length);
    }

    addPageButton() {
        const pageButton = this.pageButtonContainer.addContent(new ButtonCommandItem());
        pageButton.setContext(ContextualClass.primary);
        pageButton.useOutlineStyle();
        this.contents.push(pageButton);
        return pageButton;
    }

    addEllipsis() {
        const ellipsis = this.pageButtonContainer.addContent(new TextSpanView());
        ellipsis.setText('...');
        ellipsis.addCssName('col-form-label');
        ellipsis.setPadding(PaddingCss.xs({ start: 3, end: 3 }));
        this.contents.push(ellipsis);
        return ellipsis;
    }
}