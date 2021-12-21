import { ColumnCss } from "../ColumnCss";
import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { ContextualClass } from "../ContextualClass";
import { Row } from "../Grid/Row";
import { HtmlComponent } from "../Html/HtmlComponent";
import { TextBlock } from "../Html/TextBlock";
import { TextHeading5 } from "../Html/TextHeading5";
import { MarginCss } from "../MarginCss";
import { TextCss } from "../TextCss";
import { ModalComponentView } from "./ModalComponentView";
import { ModalComponentViewModel } from "./ModalComponentViewModel";

export class ModalConfirmComponentView extends HtmlComponent {
    private readonly modal: ModalComponentView;
    private readonly title: TextHeading5;
    private readonly message: TextBlock;

    readonly noButton: ButtonCommandItem;
    readonly yesButton: ButtonCommandItem;

    readonly closed: IEventHandler<any>;

    constructor(vm: ModalComponentViewModel = new ModalComponentViewModel()) {
        super(vm);
        this.modal = new ModalComponentView(vm);
        this.modal.setBackdrop('static');
        this.modal.body.setName(ModalConfirmComponentView.name);
        this.title = this.modal.header.addContent(new TextHeading5(''));
        this.message = this.modal.body.addContent(new TextBlock(''));
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
        this.yesButton == buttonColumn.addContent(new ButtonCommandItem());
        this.yesButton.icon.setName('check');
        this.yesButton.setText('Yes');
        this.yesButton.setContext(ContextualClass.primary);
        this.closed = this.modal.closed;
    }

    setTitle(title: string) {
        this.title.setText(title);
    }

    showTitle() { this.title.show(); }

    hideTitle() { this.title.hide(); }

    setMessage(message: string) {
        this.message.setText(message);
    }

    showModal() {
        this.modal.showModal();
    }

    hideModal() {
        this.modal.hideModal();
    }
}