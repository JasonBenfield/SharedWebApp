import { UrlBuilder } from '../UrlBuilder';
import { Startup } from 'xtistart';
import { WebPage } from '../WebPage';
import { MessageAlert } from '../MessageAlert';
import { PageFrame } from '../PageFrame';

export class UserPage {
    constructor(protected readonly page: PageFrame) {
        this.goToReturnUrl();
    }

    private goToReturnUrl() {
        this.alert.info('Opening Page...');
        let urlBuilder = UrlBuilder.current();
        let returnUrl = urlBuilder.getQueryValue('returnUrl');
        if (returnUrl) {
            returnUrl = decodeURIComponent(returnUrl);
        }
        let defaultApi = this.page.defaultApi();
        returnUrl = defaultApi ? defaultApi.url.addPart(returnUrl).value() : '/';
        new WebPage(returnUrl).open();
    }

    private readonly alert = this.page.addContent(new MessageAlert());
}
new UserPage(new Startup().build());