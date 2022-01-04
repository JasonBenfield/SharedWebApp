import { Command } from "../Command/Command";
import { MessageAlert } from "../MessageAlert";
import { ModalMessageAlertComponentView } from "./ModalMessageAlertComponentView";
export declare class ModalMessageAlertComponentResult {
    private readonly results;
    static get ok(): ModalMessageAlertComponentResult;
    private constructor();
    get ok(): {};
}
export declare class ModalMessageAlertComponent {
    private readonly view;
    private readonly _alert;
    private readonly awaitable;
    readonly okCommand: Command;
    constructor(view: ModalMessageAlertComponentView);
    private onClosed;
    setBackdrop(backdrop: boolean | 'static'): void;
    alert(action: (a: MessageAlert) => void): Promise<void>;
    private ok;
}
