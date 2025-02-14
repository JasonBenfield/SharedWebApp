﻿import { UrlBuilder } from "../UrlBuilder";
import { AppResourceUrl } from "./AppResourceUrl";
import { WebPage } from "./WebPage";

export class AppClientView<TArgs> {
    private resourceUrl: AppResourceUrl;

    constructor(
        resourceUrl: AppResourceUrl,
        actionName: string
    ) {
        this.resourceUrl = resourceUrl.withAction(actionName);
    }

    get path() { return this.resourceUrl.path; }

    withModifier(modifier: string) {
        this.resourceUrl = this.resourceUrl.withModifier(modifier);
    }

    getUrl(data: TArgs) {
        return this.getModifierUrl(null, data);
    }

    getModifierUrl(modifier: string, data: TArgs) {
        let model: any;
        const obj: any = data;
        if (obj === undefined || obj === null) {
            model = obj;
        }
        else if (typeof obj === 'string' || typeof obj === 'number' || 'toJSON' in obj) {
            model = { model: data };
        }
        else {
            model = data;
        }
        const resourceUrl = modifier === undefined || modifier === null
            ? this.resourceUrl.withCurrentVersion()
            : this.resourceUrl.withCurrentVersion().withModifier(modifier);
        const urlBuilder = new UrlBuilder(resourceUrl.url.value());
        urlBuilder.addQueryFromObject(model);
        return urlBuilder;
    }

    getVersionedUrl(data: TArgs) {
        return this.getVersionedModifierUrl(null, data);
    }

    getVersionedModifierUrl(modifier: string, data: TArgs) {
        let model: any;
        if (data === undefined || data === null) {
            model = data;
        }
        else if (typeof data === 'string' || typeof data === 'number' || data instanceof Date) {
            model = { model: data };
        }
        else {
            model = data;
        }
        const resourceUrl = modifier === undefined || modifier === null
            ? this.resourceUrl
            : this.resourceUrl.withModifier(modifier);
        const urlBuilder = new UrlBuilder(resourceUrl.url.value());
        urlBuilder.addQueryFromObject(model);
        return urlBuilder;
    }

    open(data: TArgs, modifier?: string) {
        const webPage = this.createWebPage(data, modifier);
        webPage.open();
    }

    openWindow(data: TArgs, modifier?: string) {
        const webPage = this.createWebPage(data, modifier);
        webPage.openWindow();
    }

    private createWebPage(data: TArgs, modifier?: string) {
        const urlBuilder = this.getModifierUrl(modifier, data);
        return new WebPage(urlBuilder);
    }
}