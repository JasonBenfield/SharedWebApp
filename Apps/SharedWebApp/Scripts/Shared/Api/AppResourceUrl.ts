import { XtiPath } from "./XtiPath";
import { UrlBuilder } from "../UrlBuilder";
import { Url } from "../Url";
import { AppVersionDomain } from "./AppVersionDomain";

export class AppResourceUrl {
    static app(appName: string, modifier: string, cacheBust: string) {
        let appVersionDomain = new AppVersionDomain().value(appName);
        return new AppResourceUrl(
            `https://${appVersionDomain.Domain}/`,
            XtiPath.app(appName, appVersionDomain.Version, modifier),
            cacheBust
        );
    }

    readonly url: Url;

    private constructor(
        private readonly baseUrl: string,
        readonly path: XtiPath,
        private readonly cacheBust: string
    ) {
        this.url = new UrlBuilder(baseUrl)
            .addPart(path.format())
            .addQuery('cacheBust', cacheBust)
            .url;
    }

    get relativeUrl() {
        return new UrlBuilder(`/${this.path.format()}`);
    }

    withGroup(group: string) {
        return new AppResourceUrl(this.baseUrl, this.path.withGroup(group), this.cacheBust);
    }

    withAction(action: string) {
        return new AppResourceUrl(this.baseUrl, this.path.withAction(action), this.cacheBust);
    }

    withModifier(modifier: string) {
        return new AppResourceUrl(this.baseUrl, this.path.withModifier(modifier), this.cacheBust);
    }

    toString() {
        return this.url.value();
    }
}