import { MessageAlertView } from '../MessageAlertView';
import { PageFrame } from '../PageFrame';

export class UserPageView {
    readonly alert = this.page.addContent(new MessageAlertView());

    constructor(protected readonly page: PageFrame) {
    }
}