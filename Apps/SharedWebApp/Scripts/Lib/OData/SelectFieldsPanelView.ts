import { ColumnCss } from "../ColumnCss";
import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { BlockView } from "../Views/BlockView";
import { ButtonCommandView } from "../Views/Command";
import { GridView } from "../Views/Grid";
import { ButtonListGroupView, GridListGroupView } from "../Views/ListGroup";
import { MessageAlertView } from "../Views/MessageAlertView";
import { ModalComponentView } from "../Views/Modal";
import { RowView } from "../Views/RowView";
import { TextHeading1View, TextHeading3View } from "../Views/TextHeadings";
import { AvailableFieldListItemView } from "./AvailableFieldListItemView";
import { ModalODataPanelView } from "./ModalODataPanelView";
import { SelectedFieldListItemView } from "./SelectedFieldListItemView";

export class SelectFieldsPanelView extends ModalODataPanelView {
    readonly availableFields: ButtonListGroupView<AvailableFieldListItemView>;
    readonly availableFieldsAlert: MessageAlertView;
    readonly selectFields: GridListGroupView<SelectedFieldListItemView>;
    readonly selectFieldsAlert: MessageAlertView;
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.header.addView(TextHeading1View)
            .configure(h1 => h1.setText('Select'));
        this.body.height100();
        const layoutGrid = this.body.addView(GridView);
        layoutGrid.layout();
        layoutGrid.height100();
        layoutGrid.setTemplateRows(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1)
        );
        layoutGrid.addCell()
            .addView(TextHeading3View)
            .configure(h => h.setText('Available Columns'));
        const availableBlock = layoutGrid.addCell()
            .configure(c => c.positionRelative())
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            });
        this.availableFieldsAlert = availableBlock.addView(MessageAlertView);
        this.availableFields = availableBlock.addButtonListGroup(AvailableFieldListItemView);
        layoutGrid.addCell()
            .addView(TextHeading3View)
            .configure(h => h.setText('Selected Columns'));
        const selectedBlock = layoutGrid.addCell()
            .configure(c => c.positionRelative())
            .addView(BlockView)
            .configure(b => {
                b.positionAbsoluteFill();
                b.scrollable();
            })
            .addView(BlockView)
            .configure(b => b.addCssName('container'));
        this.selectFieldsAlert = selectedBlock.addView(MessageAlertView);
        this.selectFields = selectedBlock.addGridListGroup(SelectedFieldListItemView);
        this.selectFields.setTemplateColumns(
            CssLengthUnit.auto(),
            CssLengthUnit.flex(1),
            CssLengthUnit.auto()
        );
        const toolbar = this.footer.addView(RowView);
        toolbar.addColumn();
        const buttonColumn = toolbar.addColumn()
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

    handleSelectedFieldDragStart(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.selectFields.on('dragstart')
            .select('[draggable]')
            .execute(action)
            .subscribe();
    }

    handleSelectedFieldDragEnter(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.selectFields.on('dragenter')
            .select('.list-group-item')
            .execute(action)
            .subscribe();
    }

    handleSelectedFieldDragOver(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.selectFields.on('dragover')
            .select('.list-group-item')
            .execute(action)
            .subscribe();
    }

    handleSelectedFieldDrop(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.selectFields.on('drop')
            .select('.list-group-item')
            .execute(action)
            .subscribe();
    }

    handleSelectedFieldDragEnd(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.selectFields.on('dragend')
            .select('.list-group-item')
            .execute(action)
            .subscribe();
    }

    handleDeleteButtonClick(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.selectFields.on('click')
            .select('button.deleteButton')
            .execute(action)
            .subscribe();
    }
}