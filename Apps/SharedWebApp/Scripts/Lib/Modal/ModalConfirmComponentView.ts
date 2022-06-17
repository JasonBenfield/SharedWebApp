import { ColumnCss } from "../ColumnCss";
import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { ContextualClass } from "../ContextualClass";
import { Row } from "../Grid/Row";
import { HtmlComponent } from "../Html/HtmlComponent";
import { TextBlockView } from "../Html/TextBlockView";
import { TextHeading5View } from "../Html/TextHeading5View";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { ModalComponentView } from "./ModalComponentView";
import { ModalComponentViewModel } from "./ModalComponentViewModel";

export class ModalConfirmComponentView extends HtmlComponent {
    private readonly modal: ModalComponentView;
    readonly title: TextHeading5View;
    readonly message: TextBlockView;

    readonly noButton: ButtonCommandItem;
    readonly yesButton: ButtonCommandItem;

    readonly closed: IEventHandler<any>;

    constructor(vm: ModalComponentViewModel = new ModalComponentViewModel()) {
        super(vm);
        this.modal = new ModalComponentView(vm);
        this.modal.setBackdrop('static');
        this.modal.body.setName(ModalConfirmComponentView.name);
        this.title = this.modal.header.addContent(new TextHeading5View());
        this.message = this.modal.body.addContent(new TextBlockView());
        let row = this.modal.footer.addContent(new Row());
        row.addColumn();
        let buttonColumn = row.addColumn()
            .configure(c => {
                c.setTextCss(new TextCss().end());
                c.setColumnCss(ColumnCss.xs('auto'));
            });
        this.noButton = buttonColumn.addContent(new ButtonCommandItem());
        this.noButton.icon.setName('times');
        this.noButton.setText('No');
        this.noButton.setContext(ContextualClass.secondary);
        this.noButton.setMargin(MarginCss.end(1));
        this.yesButton = buttonColumn.addContent(new ButtonCommandItem());
        this.yesButton.icon.setName('check');
        this.yesButton.setText('Yes');
        this.yesButton.setContext(ContextualClass.primary);
        this.closed = this.modal.closed;
    }

    showTitle() { this.title.show(); }

    hideTitle() { this.title.hide(); }

    showModal() {
        this.modal.showModal();
    }

    hideModal() {
        this.modal.hideModal();
    }
}