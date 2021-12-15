import { Awaitable } from "../Awaitable";
import { Command } from "../Command/Command";
import { MessageAlert } from "../MessageAlert";
import { Result } from "../Result";
import { ModalMessageAlertComponentView } from "./ModalMessageAlertComponentView";

export class ModalMessageAlertComponent {
    private readonly _alert: MessageAlert;
    private readonly awaitable = new Awaitable();

    constructor(private readonly view: ModalMessageAlertComponentView) {
        this._alert = new MessageAlert(this.view.alert);
        this.okCommand.add(this.view.okButton);
        this.view.closed.register(this.onClosed.bind(this));
    }

    private onClosed() {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(
                new Result('ok')
            );
        }
    }

    setBackdrop(backdrop: boolean | 'static') {
        this.view.setBackdrop(backdrop);
    }

    async alert(action: (a: MessageAlert) => void) {
        action(this._alert);
        this.view.showModal();
        await this.awaitable.start();
    }

    readonly okCommand = new Command(this.ok.bind(this));

    private ok() {
        this.awaitable.resolve(
            new Result('ok')
        );
        this.view.hideModal();
    }
}