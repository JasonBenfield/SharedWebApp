import { MessageAlert } from "./MessageAlert";
import { CardAlertView } from "../Views/Card";
import { BasicComponent } from "./BasicComponent";

export class CardAlert extends BasicComponent {
    readonly alert: MessageAlert;

    constructor(protected readonly view: CardAlertView) {
        super(view);
        this.alert = this.addComponent(new MessageAlert(view.alert));
        view.hide();
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