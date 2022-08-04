import { Awaitable } from "../Awaitable";
import { ModalConfirmView } from "../Views/Modal";
import { Command } from "./Command";
import { TextComponent } from "./TextComponent";

interface IResult {
    readonly confirmed?: {};
    readonly rejected?: {};
}

class Result {
    static get confirmed() { return new Result({ confirmed: {} }); }

    static get rejected() { return new Result({ rejected: {} }); }

    private constructor(private readonly results: IResult) {
    }

    get confirmed() { return this.results.confirmed; }

    get rejected() { return this.results.rejected; }
}

export class ModalConfirm {
    private readonly awaitable = new Awaitable<Result>();
    private readonly message: TextComponent;
    private readonly title: TextComponent;
    private readonly yesCommand = new Command(this.yes.bind(this));
    private readonly noCommand = new Command(this.no.bind(this));

    constructor(private readonly view: ModalConfirmView) {
        this.message = new TextComponent(this.view.message);
        this.title = new TextComponent(this.view.title);
        this.noCommand.add(this.view.noButton);
        this.yesCommand.add(this.view.yesButton);
        this.view.when.closed.then(this.onClosed.bind(this));
    }

    private onClosed() {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(Result.rejected);
        }
    }

    async confirm(message: string, title: string = '') {
        this.message.setText(message);
        if (title) {
            this.view.showTitle();
        }
        else {
            this.view.hideTitle();
        }
        this.title.setText(title);
        this.view.showModal();
        let result = await this.awaitable.start();
        return Boolean(result.confirmed);
    }

    private yes() {
        this.awaitable.resolve(Result.confirmed);
        this.view.hideModal();
    }

    private no() {
        this.awaitable.resolve(Result.rejected);
        this.view.hideModal();
    }
}