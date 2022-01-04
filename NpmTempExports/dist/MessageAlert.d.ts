import { MessageAlertView } from './MessageAlertView';
export declare class MessageAlert {
    private readonly view;
    private _message;
    private readonly textBlock;
    private readonly _isVisibleChanged;
    readonly isVisibleChanged: import("./Events").DefaultEventHandler<boolean>;
    constructor(view: MessageAlertView);
    get message(): string;
    get hasMessage(): boolean;
    clear(): void;
    success(message: string): void;
    info(message: string): void;
    infoAction<TResult>(message: string, a: () => Promise<TResult>): Promise<TResult>;
    warning(message: string): void;
    danger(message: string): void;
    private setMessage;
    private debouncedSetMessage;
    private updateViewMessage;
}
