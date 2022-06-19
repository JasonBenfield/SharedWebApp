import { ColumnCss } from "../ColumnCss";
import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { ContextualClass } from "../ContextualClass";
import { Row } from "../Grid/Row";
import { TextHeading1View } from "../Html/TextHeading1View";
import { UnorderedListView } from "../Html/UnorderedListView";
import { ListGroupView } from "../ListGroup/ListGroupView";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { ModalODataPanelView } from "./ModalODataPanelView";
import { SelectFieldListItemView } from "./SelectFieldListItemView";

export class SelectFieldsPanelView extends ModalODataPanelView {
    readonly selectFields: ListGroupView;
    readonly cancelButton: ButtonCommandItem;
    readonly saveButton: ButtonCommandItem;

    constructor() {
        super();
        this.header.addContent(new TextHeading1View())
            .configure(h1 => h1.setText('Select'));
        this.selectFields = this.body.addContent(
            ListGroupView.unorderdList(() => new SelectFieldListItemView())
        );
        const toolbar = this.footer.addContent(new Row());
        toolbar.addColumn();
        let buttonColumn = toolbar.addColumn()
            .configure(c => {
                c.setTextCss(new TextCss().end());
                c.setColumnCss(ColumnCss.xs('auto'));
            });
        this.cancelButton = buttonColumn.addContent(new ButtonCommandItem());
        this.cancelButton.icon.setName('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.setContext(ContextualClass.secondary);
        this.cancelButton.setMargin(MarginCss.end(1));
        this.saveButton = buttonColumn.addContent(new ButtonCommandItem());
        this.saveButton.icon.setName('check');
        this.saveButton.setText('Save');
        this.saveButton.setContext(ContextualClass.primary);
    }
}