﻿import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { ButtonCommandView } from "./Command";
import { GridCellView } from "./Grid";
import { HorizontalRuleView } from "./HorizontalRuleView";
import { GridListGroupItemView, GridListGroupView } from "./ListGroup";
import { ModalComponentView } from "./Modal";
import { RowView } from "./RowView";
import { TextBlockView } from "./TextBlockView";
import { TextHeading4View, TextHeading5View } from "./TextHeadings";

export class ModalErrorView extends ModalComponentView {
    readonly title: TextHeading5View;
    readonly okButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.frame.addCssName('modal-dialog-scrollable');
        this.frame.setMaxWidth(CssLengthUnit.percentage(80));
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
}

export class ModalErrorGroupView extends BlockView {
    private readonly hr: HorizontalRuleView;
    readonly caption: TextHeading4View;
    readonly errorListView: GridListGroupView<ModalErrorListItemView>;

    constructor(container: BasicComponentView) {
        super(container);
        this.hr = this.addView(HorizontalRuleView);
        this.caption = this.addView(TextHeading4View);
        this.caption.addCssName('alert-heading');
        this.errorListView = this.addGridListGroup(ModalErrorListItemView);
        this.styleAsTwoTemplateColumns();
    }

    showHR() { this.hr.show(); }

    hideHR() { this.hr.hide(); }

    styleAsOneTemplateColumn() {
        ModalErrorListItemView.setOneTemplateColumn(this.errorListView);
    }

    styleAsTwoTemplateColumns() {
        ModalErrorListItemView.setTwoTemplateColumns(this.errorListView);
    }
}

export class ModalErrorListItemView extends GridListGroupItemView {
    private readonly captionCol: GridCellView;
    readonly caption: TextBlockView;
    readonly message: TextBlockView;

    static setTwoTemplateColumns(list: GridListGroupView<ModalErrorListItemView>) {
        list.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
    }

    static setOneTemplateColumn(list: GridListGroupView<ModalErrorListItemView>) {
        list.setTemplateColumns(CssLengthUnit.flex(1));
    }

    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName('list-group-item-action');
        this.captionCol = this.addCell();
        this.caption = this.captionCol.addView(TextBlockView);
        this.message = this.addCell().addView(TextBlockView);
    }

    hideCaption() { this.captionCol.hide(); }

    showCaption() { this.captionCol.show(); }
}