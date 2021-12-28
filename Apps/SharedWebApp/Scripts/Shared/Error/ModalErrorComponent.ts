import { Command } from '../Command/Command';
import { ErrorModel } from '../ErrorModel';
import { DefaultEvent } from '../Events';
import { TextBlock } from '../Html/TextBlock';
import { ModalErrorComponentView } from './ModalErrorComponentView';
import { ModalErrorGroupComponent } from './ModalErrorGroupComponent';

export class ModalErrorComponent {
    private readonly title: TextBlock;
    private readonly errorGroups: ModalErrorGroupComponent[] = [];

    private readonly _errorSelected = new DefaultEvent<ErrorModel>(this);
    readonly errorSelected = this._errorSelected.handler();

    constructor(private readonly view: ModalErrorComponentView) {
        this.title = new TextBlock('', view.title);
        this.view.closed.register(this.onClosed.bind(this));
        new Command(this.hide.bind(this)).add(this.view.okButton);
    }

    private onClosed() {
        this.clearErrors();
    }

    show(errors: ErrorModel[], caption: string = '') {
        let group = new ModalErrorGroupComponent(this.view.errorGroup());
        group.errorSelected.register(this.onErrorSelected.bind(this));
        group.load(caption, errors, this.errorGroups.length === 0);
        this.errorGroups.push(group);
        if (errors.length === 1) {
            this.title.setText('An error occurred');
        }
        else {
            this.title.setText('Errors occurred');
        }
        this.view.showModal();
    }

    hide() {
        this.clearErrors();
        this.view.hideModal();
    }

    private onErrorSelected(error: ErrorModel) {
        this._errorSelected.invoke(error);
    }

    private clearErrors() {
        this.errorGroups.splice(0, this.errorGroups.length);
        this.view.clearErrorGroups();
    }
}