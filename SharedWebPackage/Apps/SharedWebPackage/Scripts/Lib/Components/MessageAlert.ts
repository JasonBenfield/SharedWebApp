﻿import { ContextualClass } from '../ContextualClass';
import { DebouncedAction } from '../DebouncedAction';
import { EventSource } from '../Events';
import { MessageAlertView } from '../Views/MessageAlertView';
import { BasicComponent } from './BasicComponent';
import { TextComponent } from './TextComponent';

type Events = { visibleChanged: boolean };

export class MessageAlert extends BasicComponent {
    protected readonly view: MessageAlertView
    private _heading: string;
    private _message: string;
    private readonly headingTextComponent: TextComponent;
    private readonly messageTextComponent: TextComponent;

    private readonly eventSource = new EventSource<Events>(this, { visibleChanged: null });
    readonly when = this.eventSource.when;

    constructor(view: MessageAlertView) {
        super(view);
        view.hide();
        this.headingTextComponent = new TextComponent(view.headingTextView);
        this.headingTextComponent.hide();
        this._heading = view.headingTextView.getText();
        this.messageTextComponent = new TextComponent(view.messageTextView);
        this._message = view.messageTextView.getText();

    }

    get heading() { return this._heading; }

    get message() {
        return this._message;
    }

    get hasMessage() {
        return Boolean(this._message);
    }

    clear() {
        this.setMessage('', '');
    }

    success(message: string, heading = '') {
        this.view.setContext(ContextualClass.success);
        this.setMessage(message, heading);
    }

    info(message: string, heading = '') {
        this.view.setContext(ContextualClass.info);
        this.setMessage(message, heading);
    }

    async infoAction<TResult>(message: string, a: () => Promise<TResult>, heading = '') {
        let result: TResult;
        this.info(message, heading);
        try {
            result = await a();
        }
        finally {
            this.clear();
        }
        return result;
    }

    warning(message: string, heading = '') {
        this.view.setContext(ContextualClass.warning);
        this.setMessage(message, heading);
    }

    danger(message: string, heading = '') {
        this.view.setContext(ContextualClass.danger);
        this.setMessage(message, heading);
    }

    private setMessage(message: string, heading: string) {
        if (heading !== undefined) {
            this._heading = heading.trim();
        }
        this._message = message.trim();
        if (this._message) {
            this.updateViewMessage(this._message, this._heading);
        }
        this.debouncedSetMessage.execute(this._message);
    }

    private debouncedSetMessage = new DebouncedAction((message: string, heading: string) => {
        this.updateViewMessage(message, heading);
    }, 500);

    private updateViewMessage(message: string, heading: string) {
        if (heading !== undefined) {
            this.headingTextComponent.setText(heading);
            if (heading) {
                this.headingTextComponent.show();
            }
            else {
                this.headingTextComponent.hide();
            }
        }
        this.messageTextComponent.setText(message);
        if (message || heading) {
            this.view.show();
            this.eventSource.events.visibleChanged.invoke(true);
        }
        else {
            this.view.hide();
            this.eventSource.events.visibleChanged.invoke(false);
        }
    }

    protected onDipose() {
        this.eventSource.unregisterAll();
    }
}