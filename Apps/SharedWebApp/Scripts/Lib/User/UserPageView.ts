import { BasicPageView } from '../Views/BasicPageView';
import { MessageAlertView } from '../Views/MessageAlertView';

export class UserPageView extends BasicPageView {
    readonly alert: MessageAlertView;

    constructor() {
        super();
        this.alert = this.addView(MessageAlertView);
    }
}