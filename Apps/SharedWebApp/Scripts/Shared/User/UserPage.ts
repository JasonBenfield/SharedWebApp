import { UrlBuilder } from '../UrlBuilder';
import { Startup } from 'xtistart';
import { WebPage } from '../WebPage';
import { MessageAlert } from '../MessageAlert';
import { PageFrame } from '../PageFrame';
import { UserPageView } from './UserPageView';
import { AppApi } from '../AppApi';

export class UserPage {
    private readonly view: UserPageView;
    private readonly api: AppApi;
    private readonly alert: MessageAlert;

    constructor(page: PageFrame) {
        this.view = new UserPageView(page);
        this.api = page.defaultApi();
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
new UserPage(new Startup().build());