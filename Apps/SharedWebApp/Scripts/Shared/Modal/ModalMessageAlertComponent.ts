import { Awaitable } from "../Awaitable";
import { Command } from "../Command/Command";
import { MessageAlert } from "../MessageAlert";
import { ModalMessageAlertComponentView } from "./ModalMessageAlertComponentView";

interface Results {
    ok?: {};
}

export class ModalMessageAlertComponentResult {
    static get ok() { return new ModalMessageAlertComponentResult({ ok: {} }); }

    private constructor(private readonly results: Results) {
    }

    get ok() { return this.results.ok; }
}

export class ModalMessageAlertComponent {
    private readonly _alert: MessageAlert;
    private readonly awaitable = new Awaitable<ModalMessageAlertComponentResult>();
    readonly okCommand = new Command(this.ok.bind(this));

    constructor(private readonly view: ModalMessageAlertComponentView) {
        this._alert = new MessageAlert(this.view.alert);
        this.okCommand.add(this.view.okButton);
        this.view.closed.register(this.onClosed.bind(this));
    }

    private onClosed() {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(ModalMessageAlertComponentResult.ok);
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

    private ok() {
        this.awaitable.resolve(ModalMessageAlertComponentResult.ok);
        this.view.hideModal();
    }
}