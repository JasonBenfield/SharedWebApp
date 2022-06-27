import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { ButtonCommandView } from "../Views/Commands";
import { ListGroupView } from "../Views/ListGroup";
import { ModalComponentView } from "../Views/Modal";
import { RowView } from "../Views/RowView";
import { TextHeading1View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";
import { SelectFieldListItemView } from "./SelectFieldListItemView";

export class SelectFieldsPanelView extends ModalODataPanelView {
    readonly selectFields: ListGroupView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.header.addView(TextHeading1View)
            .configure(h1 => h1.setText('Select'));
        this.selectFields = this.body.addView(ListGroupView);
        this.selectFields.setItemViewType(SelectFieldListItemView);
        const toolbar = this.footer.addView(RowView);
        toolbar.addColumn();
        let buttonColumn = toolbar.addColumn()
            .configure(c => {
                c.setTextCss(new TextCss().end());
                c.setColumnCss(ColumnCss.xs('auto'));
            });
        this.cancelButton = buttonColumn.addView(ButtonCommandView);
        this.cancelButton.icon.solidStyle('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.setContext(ContextualClass.secondary);
        this.cancelButton.setMargin(MarginCss.end(1));
        this.saveButton = buttonColumn.addView(ButtonCommandView);
        this.saveButton.icon.solidStyle('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass.primary);
    }
}