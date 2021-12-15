import { MessageAlert } from "../MessageAlert";
import { CardAlertView } from "./CardAlertView";

export class CardAlert {
    readonly alert = new MessageAlert(this.view.alert);

    constructor(private readonly view: CardAlertView) {
        this.view.hide();
        this.alert.messageChanged.register(this.onMessageChanged.bind(this));
    }

    private onMessageChanged(message: string) {
        if (message) {
            this.view.show();
        }
        else {
            this.view.hide();
        }
    }
}