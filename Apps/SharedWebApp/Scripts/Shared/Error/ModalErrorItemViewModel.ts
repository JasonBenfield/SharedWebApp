import * as ko from 'knockout';

export class ModalErrorItemViewModel {
    readonly captionCss = ko.observable('');
    readonly caption = ko.observable('');
    readonly messageCss = ko.observable('');
    readonly message = ko.observable('');
}