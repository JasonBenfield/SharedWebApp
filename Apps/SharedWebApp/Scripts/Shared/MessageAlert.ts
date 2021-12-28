import * as _ from 'lodash';
import { ContextualClass } from './ContextualClass';
import { DebouncedAction } from './DebouncedAction';
import { DefaultEvent } from './Events';
import { TextBlock } from './Html/TextBlock';
import { MessageAlertView } from './MessageAlertView';

export class MessageAlert {
    private _message: string;
    private readonly textBlock: TextBlock;

    private readonly _messageChanged = new DefaultEvent<string>(this);
    readonly messageChanged = this._messageChanged.handler();

    constructor(private readonly view: MessageAlertView) {
        this.textBlock = new TextBlock('', view.textBlock);
    }

    get message() {
        return this._message;
    }

    get hasMessage() {
        return Boolean(this._message);
    }

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

    async infoAction<TResult>(message: string, a: () => Promise<TResult>) {
        let result: TResult;
        this.info(message);
        try {
            result = await a();
        }
        finally {
            this.clear();
        }
        return result;
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
        this.debouncedSetMessage.execute(this._message);
    }

    private debouncedSetMessage = new DebouncedAction((message: string) => {
        this.updateVmMessage(message);
    }, 500);

    private updateVmMessage(message: string) {
        this.textBlock.setText(message);
        if (message) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    }
}