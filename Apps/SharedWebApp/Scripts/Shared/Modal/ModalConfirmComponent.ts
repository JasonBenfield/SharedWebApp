import { Awaitable } from "../Awaitable";
import { Command } from "../Command/Command";
import { ModalConfirmComponentView } from "./ModalConfirmComponentView";

interface Results {
    confirmed?: {};
    rejected?: {};
}

export class ModalConfirmComponentResult {
    static get confirmed() { return new ModalConfirmComponentResult({ confirmed: {} }); }

    static get rejected() { return new ModalConfirmComponentResult({ rejected: {} }); }

    private constructor(private readonly results: Results) {
    }

    get confirmed() { return this.results.confirmed; }

    get rejected() { return this.results.rejected; }
}

export class ModalConfirmComponent {
    private readonly awaitable = new Awaitable<ModalConfirmComponentResult>();
    private readonly yesCommand = new Command(this.yes.bind(this));
    private readonly noCommand = new Command(this.no.bind(this));

    constructor(private readonly view: ModalConfirmComponentView) {
        this.noCommand.add(this.view.noButton);
        this.yesCommand.add(this.view.yesButton);
        this.view.closed.register(this.onClosed.bind(this));
    }

    private onClosed() {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(ModalConfirmComponentResult.rejected);
        }
    }

    async confirm(message: string, title: string = '') {
        this.view.setMessage(message);
        if (title) {
            this.view.showTitle();
        }
        else {
            this.view.hideTitle();
        }
        this.view.setTitle(title);
        this.view.showModal();
        let result = await this.awaitable.start();
        return Boolean(result.confirmed);
    }

    private yes() {
        this.awaitable.resolve(ModalConfirmComponentResult.confirmed);
        this.view.hideModal();
    }

    private no() {
        this.awaitable.resolve(ModalConfirmComponentResult.rejected);
        this.view.hideModal();
    }
}