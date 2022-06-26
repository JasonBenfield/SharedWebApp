import { XtiUrl } from "../Api/XtiUrl";
import { BasicPageView } from "../Views/BasicPageView";
import { Link } from "./Link";

export class BasicPage {
    constructor(protected readonly view: BasicPageView) {
        new Link(view.homeLink).setHref(XtiUrl.current().homeUrl());
        const logoutUrl = new Link(view.logOutLink);
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