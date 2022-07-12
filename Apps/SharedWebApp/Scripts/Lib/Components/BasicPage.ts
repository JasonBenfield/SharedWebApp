import { XtiUrl } from "../Api/XtiUrl";
import { BasicPageView } from "../Views/BasicPageView";
import { LinkComponent } from "./LinkComponent";

export class BasicPage {
    constructor(protected readonly view: BasicPageView) {
        new LinkComponent(view.homeLink).setHref(XtiUrl.current().homeUrl());
        const logoutUrl = new LinkComponent(view.logOutLink);
        logoutUrl.setHref(this.getLogutUrl());
        view.when.urlChanged.then(() => logoutUrl.setHref(this.getLogutUrl()));
    }

    private getLogutUrl() {
        let returnUrl = location.href;
        if (returnUrl.indexOf('#') > -1) {
            if (returnUrl.indexOf('?') > -1) {
                returnUrl.replace('#', '&');
            }
            else {
                returnUrl.replace('#', '?');
            }
        }
        return XtiUrl.current()
            .homeUrl()
            .addPart('User')
            .addPart('Logout')
            .addQuery('cacheBust', pageContext.CacheBust)
            .addQuery('ReturnUrl', encodeURIComponent(returnUrl));
    }

}