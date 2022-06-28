import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { PaddingCss } from "../PaddingCss";
import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { BlockView } from "../Views/BlockView";
import { ButtonCommandView } from "../Views/Commands";
import { RowView } from "../Views/RowView";
import { TextBlockView } from "../Views/TextBlockView";
import { TextSpanView } from "../Views/TextSpanView";

export class ODataFooterComponentView extends BlockView {
    private readonly pageButtonContainer: BlockView;
    readonly count: BasicTextComponentView;

    constructor(container: BasicComponentView) {
        super(container);
        this.setPadding(PaddingCss.xs(3));
        const row = this.addView(RowView);
        const col1 = row.addColumn();
        this.pageButtonContainer = col1.addView(BlockView);
        this.pageButtonContainer.addCssName('btn-group');
        const col2 = row.addColumn();
        col2.setColumnCss(ColumnCss.xs('auto'));
        col2.addCssName('col-form-label');
        this.count = col2.addView(TextBlockView);
    }

    clearContents() {
        this.pageButtonContainer.disposeAllViews();
    }

    addPageButton() {
        const pageButton = this.pageButtonContainer.addView(ButtonCommandView);
        pageButton.setContext(ContextualClass.primary);
        pageButton.useOutlineStyle();
        return pageButton;
    }

    addEllipsis() {
        const ellipsis = this.pageButtonContainer.addView(TextSpanView);
        ellipsis.setText('...');
        ellipsis.addCssName('col-form-label');
        ellipsis.setPadding(PaddingCss.xs({ start: 3, end: 3 }));
        return ellipsis;
    }
}