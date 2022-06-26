import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { ColumnView } from "./ColumnView";
import { ButtonCommandView } from "./Commands";
import { HorizontalRuleView } from "./HorizontalRuleView";
import { LinkListGroupItemView, LinkListGroupView, ListGroupView } from "./ListGroup";
import { ModalComponentView } from "./Modal";
import { RowView } from "./RowView";
import { TextBlockView } from "./TextBlockView";
import { TextHeading4View, TextHeading5View } from "./TextHeadings";

export class ModalErrorView extends ModalComponentView {
    readonly title: TextHeading5View;
    readonly okButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.body.setViewName(ModalErrorView.name);
        this.body.addCssName('alert alert-danger m-0 rounded-0 border-danger border-left-0 border-right-0');
        this.title = this.header.addView(TextHeading5View);
        const row = this.footer.addView(RowView);
        row.addColumn();
        const buttonColumn = row.addColumn();
        buttonColumn.setTextCss(new TextCss().end());
        buttonColumn.setColumnCss(ColumnCss.xs('auto'));
        this.okButton = this.footer.addView(ButtonCommandView);
        this.okButton.setText('OK');
        this.okButton.setContext(ContextualClass.danger);
    }

    errorGroup() {
        return this.body.addView(ModalErrorGroupView);
    }

    clearErrorGroups() {
        this.body.disposeAllViews();
    }
}

export class ModalErrorGroupView extends BlockView {
    private readonly hr: HorizontalRuleView;
    readonly caption: TextHeading4View;
    readonly errors: ListGroupView;

    constructor(container: BasicComponentView) {
        super(container);
        this.hr = this.addView(HorizontalRuleView);
        this.caption = this.addView(TextHeading4View);
        this.caption.addCssName('alert-heading');
        this.errors = this.addView(LinkListGroupView);
        this.errors.setItemViewType(ModalErrorListItemView);
    }

    showHR() { this.hr.show(); }

    hideHR() { this.hr.hide(); }
}

export class ModalErrorListItemView extends LinkListGroupItemView {
    private readonly captionCol: ColumnView;
    readonly caption: TextBlockView;
    readonly message: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        const row = this.addView(RowView);
        this.captionCol = row.addColumn();
        this.captionCol.setColumnCss(ColumnCss.xs(3));
        this.caption = this.captionCol.addView(TextBlockView);
        const col2 = row.addColumn();
        this.message = col2.addView(TextBlockView);
    }

    hideCaption() { this.captionCol.hide(); }

    showCaption() { this.captionCol.show(); }
}