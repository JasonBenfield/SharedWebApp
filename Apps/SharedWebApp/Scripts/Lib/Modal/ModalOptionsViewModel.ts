import * as ko from 'knockout';
import { DefaultEventHandler, SimpleEvent } from '../Events';

export class ModalOptionsViewModel {
    readonly command = ko.observable<'' | 'show' | 'hide'>('');
    readonly backrop = ko.observable<boolean | 'static'>(true);

    private readonly _closed = new SimpleEvent(this);
    readonly closed = new DefaultEventHandler(this._closed);

    handleClose() {
        this._closed.invoke();
    }
}