import { Modal } from 'bootstrap';
import { ColumnCss } from '../ColumnCss';
import { ContextualClass } from '../ContextualClass';
import { SimpleEvent } from '../Events';
import { MarginCss } from '../MarginCss';
import { TextCss } from '../TextCss';
import { BasicComponentView } from './BasicComponentView';
import { BlockView } from './BlockView';
import { ButtonCommandView } from './Commands';
import { MessageAlertView } from './MessageAlertView';
import { RowView } from './RowView';
import { TextBlockView } from './TextBlockView';
import { TextHeading5View } from './TextHeadings';

export class ModalComponentView extends BasicComponentView {
    private modal: Modal;
    private backdrop: boolean | 'static' = 'static';
    private readonly _closed = new SimpleEvent(this);
    readonly closed = this._closed.handler();

    readonly header: BlockView;
    readonly body: BlockView;
    readonly footer: BlockView;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('modal');
        this.addCssName('fade');
        this.setAttr(a => a.role = 'dialog');
        const modalFrame = this.addView(BlockView);
        modalFrame.setRole('document');
        modalFrame.addCssName('modal-dialog');
        modalFrame.addCssName('modal-dialog-centered');
        const content = modalFrame.addView(BlockView);
        content.addCssName('modal-content');
        this.header = content.addView(BlockView);
        this.header.addCssName('modal-header');
        this.body = content.addView(BlockView);
        this.body.addCssName('modal-body');
        this.footer = content.addView(BlockView);
        this.footer.addCssName('modal-footer');
        this.on('hidden.bs.modal').execute(() => this._closed.invoke());
    }

    setBackdrop(backdrop: boolean | 'static') {
        this.backdrop = backdrop;
    }

    showModal() {
        if (!this.modal) {
            let modalOptions: Modal.Options = {
                backdrop: this.backdrop,
                keyboard: true,
                focus: true
            };
            this.modal = new Modal(this.elementView.element, modalOptions);
        }
        this.modal.show();
    }

    hideModal() {
        const modal = this.modal;
        if (modal) {
            modal.hide();
        }
    }
}

export class ModalMessageAlertView extends ModalComponentView {
    readonly alert: MessageAlertView;
    readonly okButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.header.hide();
        this.body.setViewName(ModalMessageAlertView.name);
        this.alert = this.body.addView(MessageAlertView);
        this.alert.setMargin(MarginCss.xs(0));
        let row = this.footer.addView(RowView);
        row.addColumn();
        let buttonColumn = row.addColumn()
            .configure(c => {
                c.setTextCss(new TextCss().end());
                c.setColumnCss(ColumnCss.xs('auto'));
            });
        this.okButton = buttonColumn.addView(ButtonCommandView);
        this.okButton.icon.solidStyle('check');
        this.okButton.setText('OK');
        this.okButton.setContext(ContextualClass.secondary);
        this.okButton.setMargin(MarginCss.end(1));
    }
}

export class ModalConfirmView extends ModalComponentView {
    readonly title: TextHeading5View;
    readonly message: TextBlockView;

    readonly noButton: ButtonCommandView;
    readonly yesButton: ButtonCommandView;

    constructor(container: BasicComponentView) {
        super(container);
        this.body.setViewName(ModalConfirmView.name);
        this.title = this.header.addView(TextHeading5View);
        this.message = this.body.addView(TextBlockView);
        const row = this.footer.addView(RowView);
        row.addColumn();
        let buttonColumn = row.addColumn()
            .configure(c => {
                c.setTextCss(new TextCss().end());
                c.setColumnCss(ColumnCss.xs('auto'));
            });
        this.noButton = buttonColumn.addView(ButtonCommandView);
        this.noButton.icon.solidStyle('times');
        this.noButton.setText('No');
        this.noButton.setContext(ContextualClass.secondary);
        this.noButton.setMargin(MarginCss.end(1));
        this.yesButton = buttonColumn.addView(ButtonCommandView);
        this.yesButton.icon.solidStyle('check');
        this.yesButton.setText('Yes');
        this.yesButton.setContext(ContextualClass.primary);
    }

    showTitle() { this.title.show(); }

    hideTitle() { this.title.hide(); }
}