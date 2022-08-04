import { ContextualClass } from "../ContextualClass";
import { TextCss } from "../TextCss";
import { BasicTextComponentView } from "../Views/BasicTextComponentView";
import { ButtonCommandView } from "../Views/Command";
import { ButtonListGroupView, TextButtonListGroupItemView } from "../Views/ListGroup";
import { ModalComponentView } from "../Views/Modal";
import { TextHeading1View } from "../Views/TextHeadings";
import { ModalODataPanelView } from "./ModalODataPanelView";

export class SelectFilterConditionPanelView extends ModalODataPanelView {
    readonly title: BasicTextComponentView;
    readonly conditions: ButtonListGroupView;
    readonly backButton: ButtonCommandView;

    constructor(modal: ModalComponentView) {
        super(modal);
        this.title = this.header.addView(TextHeading1View);
        this.conditions = this.body.addView(ButtonListGroupView);
        this.conditions.setItemViewType(TextButtonListGroupItemView);
        this.footer.setTextCss(new TextCss().start());
        this.footer.addCssName('w-100');
        this.backButton = this.footer.addView(ButtonCommandView);
        this.backButton.useOutlineStyle(ContextualClass.secondary);
        this.backButton.icon.solidStyle('caret-left');
        this.backButton.setText('Back');
    }
}