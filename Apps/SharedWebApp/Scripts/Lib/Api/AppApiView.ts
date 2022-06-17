import { AppResourceUrl } from "./AppResourceUrl";
import { UrlBuilder } from "../UrlBuilder";
import { WebPage } from "./WebPage";

export class AppApiView<TArgs> {
    private readonly resourceUrl: AppResourceUrl;

    constructor(
        resourceUrl: AppResourceUrl,
        actionName: string
    ) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }

    getUrl(data: TArgs) {
        return this.getModifierUrl(null, data);
    }

    getModifierUrl(modifier: string, data: TArgs) {
        let model: any;
        if (typeof data === 'string' || typeof data === 'number' || data instanceof Date) {
            model = { model: data };
        }
        else {
            model = data;
        }
        let resourceUrl = modifier === undefined || modifier === null
            ? this.resourceUrl
            : this.resourceUrl.withModifier(modifier);
        let urlBuilder = new UrlBuilder(resourceUrl.url.value());
        urlBuilder.addQueryFromObject(model);
        return urlBuilder;
    }

    open(data: TArgs) {
        let webPage = this.createWebPage(data);
        webPage.open();
    }

    openWindow(data: TArgs) {
        let webPage = this.createWebPage(data);
        webPage.openWindow();
    }

    private createWebPage(data: TArgs) {
        let urlBuilder = this.getUrl(data);
        return new WebPage(urlBuilder);
    }
}