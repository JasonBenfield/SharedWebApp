import { MessageAlert } from "../MessageAlert";
import { CardAlertView } from "./CardAlertView";
export declare class CardAlert {
    private readonly view;
    readonly alert: MessageAlert;
    constructor(view: CardAlertView);
    private onIsVisibleChanged;
}
