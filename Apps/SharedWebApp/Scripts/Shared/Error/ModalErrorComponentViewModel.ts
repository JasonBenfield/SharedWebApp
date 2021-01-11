import * as ko from 'knockout';
import * as template from './ModalErrorComponent.html';
import { ComponentTemplate } from '../ComponentTemplate';
import { ModalOptionsViewModel } from '../ModalOptionsViewModel';
import { ModalErrorViewModel } from './ModalErrorViewModel';
import { createCommandButtonViewModel } from "../Templates/CommandButtonTemplate";
import { singleton } from 'tsyringe';
import { ArrayItemEventCollection, DefaultEvent, DefaultEventHandler } from '../Events';
import { ErrorModel } from '../ErrorModel';

@singleton()
export class ModalErrorComponentViewModel {
    constructor() {
        new ComponentTemplate(this.componentName(), template).register();
        this.errorSelectedEvents.register(
            (e: ModalErrorViewModel) => e.errorSelected,
            this.onErrorSelected.bind(this)
        );
    }

    readonly componentName = ko.observable('modal-error-component');
    readonly title = ko.observable('');
    readonly isVisible = ko.observable(false);
    readonly modalOptions = new ModalOptionsViewModel();
    readonly errors = ko.observableArray<ModalErrorViewModel>([]);

    private readonly errorSelectedEvents = new ArrayItemEventCollection(this.errors);

    readonly okCommand = createCommandButtonViewModel();

    private readonly _errorSelected = new DefaultEvent<ErrorModel>(this);
    readonly errorSelected = new DefaultEventHandler<ErrorModel>(this._errorSelected);

    private onErrorSelected(error: ErrorModel) {
        this._errorSelected.invoke(error);
    }
}