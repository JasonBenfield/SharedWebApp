import { AppApi } from '../Api/AppApi';
import { WebPage } from '../Api/WebPage';
import { BasicPage } from '../Components/BasicPage';
import { MessageAlert } from '../Components/MessageAlert';
import { UrlBuilder } from '../UrlBuilder';
import { BasicPageView } from '../Views/BasicPageView';
import { UserPageView } from './UserPageView';

export class UserPage extends BasicPage {
    protected readonly view: UserPageView;
    private readonly api: AppApi;
    private readonly alert: MessageAlert;

    constructor(createApi: (view: BasicPageView) => AppApi) {
        super(new UserPageView());
        this.api = createApi(this.view);
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