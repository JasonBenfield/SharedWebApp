import * as ko from 'knockout';
import { ModalErrorItemViewModel } from './ModalErrorItemViewModel';

export class ModalErrorViewModel {
    readonly errors = ko.observableArray<ModalErrorItemViewModel>([]);
    readonly caption = ko.observable('');
}