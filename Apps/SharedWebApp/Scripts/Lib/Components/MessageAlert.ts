import * as _ from 'lodash';
import { ContextualClass } from '../ContextualClass';
import { DebouncedAction } from '../DebouncedAction';
import { DefaultEvent } from '../Events';
import { TextComponent } from './TextComponent';
import { MessageAlertView } from '../Views/MessageAlertView';
import { BasicComponent } from './BasicComponent';

export class MessageAlert extends BasicComponent {
    protected readonly view: MessageAlertView
    private _message: string;
    private readonly textBlock: TextComponent;

    private readonly _isVisibleChanged = new DefaultEvent<boolean>(this);
    readonly isVisibleChanged = this._isVisibleChanged.handler();

    constructor(view: MessageAlertView) {
        super(view);
        this.textBlock = new TextComponent(view.textBlock);
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
        if (this._message) {
            this.updateViewMessage(this._message);
        }
        this.debouncedSetMessage.execute(this._message);
    }

    private debouncedSetMessage = new DebouncedAction((message: string) => {
        this.updateViewMessage(message);
    }, 500);

    private updateViewMessage(message: string) {
        this.textBlock.setText(message);
        if (message) {
            this.view.show();
            this._isVisibleChanged.invoke(true);
        }
        else {
            this.view.hide();
            this._isVisibleChanged.invoke(false);
        }
    }
}