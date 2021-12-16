import { AppApi } from '../AppApi';
import { MessageAlert } from '../MessageAlert';
import { PageFrameView } from '../PageFrameView';
import { UrlBuilder } from '../UrlBuilder';
import { WebPage } from '../WebPage';
import { UserPageView } from './UserPageView';

export class UserPage {
    private readonly view: UserPageView;
    private readonly api: AppApi;
    private readonly alert: MessageAlert;

    constructor(page: PageFrameView, api: AppApi) {
        this.view = new UserPageView(page);
        this.api = api;
        this.alert = new MessageAlert(this.view.alert);
        this.goToReturnUrl();
    }

    private goToReturnUrl() {
        this.alert.info('Opening Page...');
        let urlBuilder = UrlBuilder.current();
        let returnUrl = urlBuilder.getQueryValue('returnUrl');
        if (returnUrl) {
            returnUrl = decodeURIComponent(returnUrl);
        }
        returnUrl = this.api ? this.api.url.addPart(returnUrl).value() : '/';
        new WebPage(returnUrl).open();
    }
}