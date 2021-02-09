import * as ko from 'knockout';
import * as template from './ModalErrorComponent.html';
import { ComponentTemplate } from '../ComponentTemplate';
import { ModalOptionsViewModel } from '../ModalOptionsViewModel';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { ArrayItemEventCollection, DefaultEvent, DefaultEventHandler } from '../Events';
import { ErrorModel } from '../ErrorModel';
import { ComponentViewModel } from '../ComponentViewModel';
import { ButtonViewModel } from '../Html/ButtonViewModel';

export class ModalErrorComponentViewModel extends ComponentViewModel {
    constructor() {
        super(new ComponentTemplate('modal-error-component', template));
        this.errorSelectedEvents.register(
            (e: ModalErrorViewModel) => e.errorSelected,
            this.onErrorSelected.bind(this)
        );
    }

    readonly title = ko.observable('');
    readonly isVisible = ko.observable(false);
    readonly modalOptions = new ModalOptionsViewModel();
    readonly errors = ko.observableArray<ModalErrorViewModel>([]);

    private readonly errorSelectedEvents = new ArrayItemEventCollection(this.errors);

    readonly okCommand = new ButtonViewModel();

    private readonly _errorSelected = new DefaultEvent<ErrorModel>(this);
    readonly errorSelected = new DefaultEventHandler<ErrorModel>(this._errorSelected);

    private onErrorSelected(error: ErrorModel) {
        this._errorSelected.invoke(error);
    }
}