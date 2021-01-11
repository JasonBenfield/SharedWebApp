import * as ko from 'knockout';
import { ErrorModel } from '../ErrorModel';

export class ModalErrorItemViewModel {
    constructor(public readonly error: ErrorModel) {
        this.caption(error.Caption);
        this.message(error.Message);
    }
    readonly captionCss = ko.observable('');
    readonly caption = ko.observable('');
    readonly messageCss = ko.observable('');
    readonly message = ko.observable('');
}