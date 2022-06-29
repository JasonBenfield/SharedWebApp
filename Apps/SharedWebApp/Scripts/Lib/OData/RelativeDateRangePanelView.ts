import { ContextualClass } from "../ContextualClass";
import { MarginCss } from "../MarginCss";
import { ButtonCommandView } from "../Views/Commands";
import { ModalComponentView } from "../Views/Modal";
import { TextHeading1View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class RelativeDateRangePanelView extends ModalODataPanelView {
    readonly cancelButton: ButtonCommandView;
    readonly saveButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.header.addView(TextHeading1View).setText('Filter');
        this.cancelButton = this.footer.addView(ButtonCommandView);
        this.cancelButton.icon.solidStyle('times');
        this.cancelButton.setText('Cancel');
        this.cancelButton.useOutlineStyle(ContextualClass.secondary);
        this.cancelButton.setMargin(MarginCss.end(3));
        this.saveButton = this.footer.addView(ButtonCommandView);
        this.saveButton.icon.solidStyle('check');
        this.saveButton.setText('Filter');
        this.saveButton.useOutlineStyle(ContextualClass.primary);
    }
}