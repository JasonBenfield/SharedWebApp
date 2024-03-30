import { MessageAlert } from "./MessageAlert";
import { CardAlertView } from "../Views/Card";

export class CardAlert {
    readonly alert: MessageAlert;

    constructor(private readonly view: CardAlertView) {
        this.alert = new MessageAlert(this.view.alert);
        this.view.hide();
        this.alert.when.visibleChanged.then(this.onIsVisibleChanged.bind(this));
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