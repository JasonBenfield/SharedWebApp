import { ColumnCss } from '../ColumnCss';
import { ButtonCommandItem } from '../Command/ButtonCommandItem';
import { ContextualClass } from '../ContextualClass';
import { DefaultEvent } from '../Events';
import { Row } from '../Grid/Row';
import { Block } from '../Html/Block';
import { HorizontalRule } from '../Html/HorizontalRule';
import { HtmlComponent } from '../Html/HtmlComponent';
import { TextHeading5 } from '../Html/TextHeading5';
import { ModalComponentView } from '../Modal/ModalComponentView';
import { ModalComponentViewModel } from '../Modal/ModalComponentViewModel';
import { TextCss } from '../TextCss';
import { ModalErrorGroupComponentView } from './ModalErrorGroupComponentView';
import { ModalErrorListItem } from './ModalErrorListItem';

export class ModalErrorComponentView extends HtmlComponent {
    private readonly modal: ModalComponentView;
    private readonly title: TextHeading5;
    private readonly body: Block;

    private readonly _errorSelected = new DefaultEvent<ModalErrorListItem>(this);
    readonly errorSelected = this._errorSelected.handler();

    readonly closed: IEventHandler<any>;
    readonly okButton: ButtonCommandItem;

    private readonly errorGroups: ModalErrorGroupComponentView[] = [];

    constructor(vm: ModalComponentViewModel = new ModalComponentViewModel()) {
        super(vm);
        this.modal = new ModalComponentView(vm);
        this.modal.body.setName(ModalErrorComponentView.name);
        this.body = this.modal.body.addContent(new Block());
        this.body.addCssName('alert alert-danger m-0 rounded-0 border-danger border-left-0 border-right-0');
        this.title = this.modal.header.addContent(new TextHeading5(''));
        let row = this.modal.footer.addContent(new Row());
        row.addColumn();
        let buttonColumn = row.addColumn();
        buttonColumn.setTextCss(new TextCss().end());
        buttonColumn.setColumnCss(ColumnCss.xs('auto'));
        this.okButton = this.modal.footer.addContent(new ButtonCommandItem());
        this.okButton.setText('OK');
        this.okButton.setContext(ContextualClass.danger);
        this.closed = this.modal.closed;
    }

    errorGroup() {
        let errorGroup = new ModalErrorGroupComponentView();
        this.errorGroups.push(errorGroup);
        this.body.addContent(errorGroup);
        return errorGroup;
    }

    clearErrorGroups() {
        for (let errorGroup of this.errorGroups) {
            this.body.removeItem(errorGroup);
        }
    }

    setTitle(title: string) {
        this.title.setText(title);
    }

    showModal() {
        this.modal.showModal();
    }

    hideModal() {
        this.modal.hideModal();
    }
}