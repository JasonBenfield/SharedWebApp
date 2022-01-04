import { XtiPath } from "./XtiPath";
import { UrlBuilder } from "../UrlBuilder";
import { Url } from "../Url";
export declare class AppResourceUrl {
    private readonly baseUrl;
    readonly path: XtiPath;
    private readonly cacheBust;
    static app(appName: string, modifier: string, cacheBust: string): AppResourceUrl;
    readonly url: Url;
    private constructor();
    get relativeUrl(): UrlBuilder;
    withGroup(group: string): AppResourceUrl;
    withAction(action: string): AppResourceUrl;
    withModifier(modifier: string): AppResourceUrl;
    toString(): string;
}
