import * as ko from 'knockout';
import { ErrorModel } from '../ErrorModel';
import { DefaultEvent, DefaultEventHandler } from '../Events';
import { ModalErrorItemViewModel } from './ModalErrorItemViewModel';

export class ModalErrorViewModel {
    readonly errors = ko.observableArray<ModalErrorItemViewModel>([]);
    readonly caption = ko.observable('');

    private readonly _errorSelected = new DefaultEvent<ErrorModel>(this);
    readonly errorSelected = new DefaultEventHandler<ErrorModel>(this._errorSelected);

    onErrorSelected(errorItemVM: ModalErrorItemViewModel) {
        this._errorSelected.invoke(errorItemVM.error);
    }
}