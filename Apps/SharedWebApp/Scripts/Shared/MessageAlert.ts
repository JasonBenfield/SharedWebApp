import * as _ from 'lodash';
import { ContextualClass } from './ContextualClass';
import { DefaultEvent } from './Events';
import { MessageAlertView } from './MessageAlertView';

export class MessageAlert {
    private _message: string;

    constructor(private readonly view: MessageAlertView) {
    }

    get message() {
        return this._message;
    }

    get hasMessage() {
        return Boolean(this._message);
    }

    private readonly _messageChanged = new DefaultEvent<string>(this);
    readonly messageChanged = this._messageChanged.handler();

    clear() {
        this.setMessage('');
    }

    success(message: string) {
        this.view.setContext(ContextualClass.success);
        this.setMessage(message);
    }

    info(message: string) {
        this.view.setContext(ContextualClass.info);
        this.setMessage(message);
    }

    async infoAction(message: string, a: () => Promise<any>) {
        this.info(message);
        try {
            await a();
        }
        finally {
            this.clear();
        }
    }

    warning(message: string) {
        this.view.setContext(ContextualClass.warning);
        this.setMessage(message);
    }

    danger(message: string) {
        this.view.setContext(ContextualClass.danger);
        this.setMessage(message);
    }

    private setMessage(message: string) {
        this._message = _.trim(message);
        this._messageChanged.invoke(this._message);
        if (this._message) {
            this.updateVmMessage(this._message);
        }
        this.debouncedSetMessage(this._message);
    }

    private debouncedSetMessage = _.debounce((message: string) => {
        this.updateVmMessage(message);
    }, 500);

    private updateVmMessage(message: string) {
        this.view.setMessage(message);
        if (message) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    }
}