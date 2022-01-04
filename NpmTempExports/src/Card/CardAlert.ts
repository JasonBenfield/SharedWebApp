import { MessageAlert } from "../MessageAlert";
import { CardAlertView } from "./CardAlertView";

export class CardAlert {
    readonly alert = new MessageAlert(this.view.alert);

    constructor(private readonly view: CardAlertView) {
        this.view.hide();
        this.alert.isVisibleChanged.register(this.onIsVisibleChanged.bind(this));
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