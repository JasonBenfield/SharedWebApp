import { Url } from "../Url";
import { UrlBuilder } from "../UrlBuilder";
export declare class WebPage {
    private readonly url;
    constructor(url: string | UrlBuilder | Url);
    open(): void;
    transfer(): void;
    openWindow(): void;
    openForPrint(): void;
}
