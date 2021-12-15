import { ColumnCss } from "../ColumnCss";
import { ButtonCommandItem } from "../Command/ButtonCommandItem";
import { ContextualClass } from "../ContextualClass";
import { Row } from "../Grid/Row";
import { HtmlComponent } from "../Html/HtmlComponent";
import { MarginCss } from "../MarginCss";
import { MessageAlertView } from "../MessageAlertView";
import { TextCss } from "../TextCss";
import { ModalComponent } from "./ModalComponent";
import { ModalComponentViewModel } from "./ModalComponentViewModel";

export class ModalMessageAlertComponentView extends HtmlComponent {
    private readonly modal: ModalComponent;
    readonly alert: MessageAlertView;
    readonly okButton: ButtonCommandItem;
    readonly closed: IEventHandler<any>;

    constructor(vm: ModalComponentViewModel = new ModalComponentViewModel()) {
        super(vm);
        this.modal = new ModalComponent(vm);
        this.modal.header.hide();
        this.modal.body.setName(ModalMessageAlertComponentView.name);
        this.alert = this.modal.body.addContent(new MessageAlertView());
        this.alert.setMargin(MarginCss.xs(0));
        let row = this.modal.footer.addContent(new Row());
        row.addColumn();
        let buttonColumn = row.addColumn()
            .configure(c => {
                c.setTextCss(new TextCss().end());
                c.setColumnCss(ColumnCss.xs('auto'));
            });
        this.okButton = buttonColumn.addContent(new ButtonCommandItem());
        this.okButton.icon.setName('check');
        this.okButton.setText('OK');
        this.okButton.setContext(ContextualClass.secondary);
        this.okButton.setMargin(MarginCss.end(1));
        this.closed = this.modal.closed;
    }

    setBackdrop(backdrop: boolean | 'static') {
        this.modal.setBackdrop(backdrop);
    }

    showModal() { this.modal.showModal(); }

    hideModal() { this.modal.hideModal(); }
}