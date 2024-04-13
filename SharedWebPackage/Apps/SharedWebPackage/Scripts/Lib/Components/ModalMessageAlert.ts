import { Awaitable } from "../Awaitable";
import { Command } from "../Components/Command";
import { ModalMessageAlertView } from "../Views/Modal";
import { MessageAlert } from "./MessageAlert";

interface IResult {
    ok?: {};
}

class Result {
    static get ok() { return new Result({ ok: {} }); }

    private constructor(private readonly results: IResult) {
    }

    get ok() { return this.results.ok; }
}

export class ModalMessageAlert {
    private readonly _alert: MessageAlert;
    private readonly awaitable = new Awaitable<Result>();
    readonly okCommand = new Command(this.ok.bind(this));

    constructor(private readonly view: ModalMessageAlertView) {
        this._alert = new MessageAlert(this.view.alert);
        this.okCommand.add(this.view.okButton);
        this.view.when.closed.then(this.onClosed.bind(this));
    }

    private onClosed() {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(Result.ok);
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
        this.awaitable.resolve(Result.ok);
        this.view.hideModal();
    }
}