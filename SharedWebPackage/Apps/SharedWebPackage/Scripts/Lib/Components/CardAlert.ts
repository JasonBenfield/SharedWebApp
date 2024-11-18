import { MessageAlert } from "./MessageAlert";
import { CardAlertView } from "../Views/Card";
import { BasicComponent } from "./BasicComponent";
import { IMessageAlert } from "./Types";

export class CardAlert extends BasicComponent implements IMessageAlert {
    private readonly alert: MessageAlert;

    constructor(protected readonly view: CardAlertView) {
        super(view);
        this.alert = this.addComponent(new MessageAlert(view.alert));
        view.hide();
        this.alert.when.visibleChanged.then(this.onIsVisibleChanged.bind(this));
    }

    get heading() { return this.alert.heading; }
    get message() { return this.alert.message; }
    get hasMessage() { return this.alert.hasMessage; }

    clear() { this.alert.clear(); }

    success(message: string, heading: string = "") { this.alert.success(message, heading); }

    info(message: string, heading: string = "") { this.alert.info(message, heading); }

    infoAction<TResult>(message: string, a: () => Promise<TResult>, heading: string = ""): Promise<TResult> {
        return this.alert.infoAction(message, a, heading);
    }

    warning(message: string, heading: string = "") {
        this.alert.warning(message, heading);
    }

    danger(message: string, heading: string = "") {
        this.alert.danger(message, heading);
    }

    dark(message: string, heading: string = "") {
        this.alert.dark(message, heading);
    }

    light(message: string, heading: string = "") {
        this.alert.light(message, heading);
    }

    primary(message: string, heading: string = "") {
        this.alert.primary(message, heading);
    }

    secondary(message: string, heading: string = "") {
        this.alert.secondary(message, heading);
    }

    private onIsVisibleChanged(isVisible: boolean) {
        if (isVisible) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    }
}