import { Awaitable } from "../Awaitable";
import { Command } from "../Command/Command";
import { Result } from "../Result";
import { ModalConfirmComponentView } from "./ModalConfirmComponentView";

export class ModalConfirmComponent {
    private readonly awaitable = new Awaitable();
    private readonly yesCommand = new Command(this.yes.bind(this));
    private readonly noCommand = new Command(this.no.bind(this));

    constructor(private readonly view: ModalConfirmComponentView) {
        this.noCommand.add(this.view.noButton);
        this.yesCommand.add(this.view.yesButton);
        this.view.closed.register(this.onClosed.bind(this));
    }

    private onClosed() {
        if (this.awaitable.isInProgress()) {
            this.awaitable.resolve(
                new Result('confirm', false)
            );
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
        return <boolean>result.data;
    }

    private yes() {
        this.awaitable.resolve(
            new Result('confirm', true)
        );
        this.view.hideModal();
    }

    private no() {
        this.awaitable.resolve(
            new Result('confirm', false)
        );
        this.view.hideModal();
    }
}