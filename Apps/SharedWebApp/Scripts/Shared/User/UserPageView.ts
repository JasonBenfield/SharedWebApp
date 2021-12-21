import { MessageAlertView } from '../MessageAlertView';
import { PageFrameView } from '../PageFrameView';

export class UserPageView {
    readonly alert = this.page.addContent(new MessageAlertView());

    constructor(protected readonly page: PageFrameView) {
    }
}