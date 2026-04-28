import { UrlBuilder } from "../UrlBuilder";
import { AppResourceUrl } from "./AppResourceUrl";
import { WebPage } from "./WebPage";

export class AppClientView<TArgs> {
    private resourceUrl: AppResourceUrl;

    constructor(resourceUrl: AppResourceUrl, actionName: string) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }

    get path() { return this.resourceUrl.path; }

    withModifier(modifier: string) {
        this.resourceUrl = this.resourceUrl.withModifier(modifier);
    }

    getUrl(data: TArgs | null) {
        return this.getModifierUrl("", data);
    }

    getModifierUrl(modifier: string, data: TArgs | null) {
        let model: any;
        const obj: any = data;
        if (obj === undefined || obj === null) {
            model = obj;
        }
        else if (typeof obj === "string" || typeof obj === "number" || "toJSON" in obj) {
            model = { model: data };
        }
        else {
            model = data;
        }
        const resourceUrl = modifier ?
            this.resourceUrl.withCurrentVersion().withModifier(modifier) :
            this.resourceUrl.withCurrentVersion();
        const urlBuilder = new UrlBuilder(resourceUrl.url.value());
        if (model) {
            urlBuilder.addQueryFromObject(model);
        }
        return urlBuilder;
    }

    getVersionedUrl(data: TArgs | null) {
        return this.getVersionedModifierUrl("", data);
    }

    getVersionedModifierUrl(modifier: string, data: TArgs | null) {
        let model: any;
        if (data === undefined || data === null) {
            model = data;
        }
        else if (typeof data === "string" || typeof data === "number" || data instanceof Date) {
            model = { model: data };
        }
        else {
            model = data;
        }
        const resourceUrl = modifier ?
            this.resourceUrl.withModifier(modifier) :
            this.resourceUrl;
        const urlBuilder = new UrlBuilder(resourceUrl.url.value());
        if (model) {
            urlBuilder.addQueryFromObject(model);
        }
        return urlBuilder;
    }

    open(data: TArgs | null, modifier?: string) {
        const webPage = this.createWebPage(data, modifier);
        webPage.open();
    }

    openWindow(data: TArgs | null, modifier?: string) {
        const webPage = this.createWebPage(data, modifier);
        webPage.openWindow();
    }

    private createWebPage(data: TArgs | null, modifier?: string) {
        const urlBuilder = this.getModifierUrl(modifier || "", data);
        return new WebPage(urlBuilder);
    }
}