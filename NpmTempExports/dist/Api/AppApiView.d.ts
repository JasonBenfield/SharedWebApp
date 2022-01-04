import { AppResourceUrl } from "./AppResourceUrl";
import { UrlBuilder } from "../UrlBuilder";
export declare class AppApiView<TArgs> {
    private readonly resourceUrl;
    constructor(resourceUrl: AppResourceUrl, actionName: string);
    getUrl(data: TArgs): UrlBuilder;
    getModifierUrl(modifier: string, data: TArgs): UrlBuilder;
    open(data: TArgs): void;
    openWindow(data: TArgs): void;
    private createWebPage;
}
