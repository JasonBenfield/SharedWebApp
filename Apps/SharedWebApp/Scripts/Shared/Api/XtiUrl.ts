import { UrlBuilder } from '../UrlBuilder';
import { XtiPath } from './XtiPath';

export class XtiUrl {
    static current() { return XtiUrl.parse(location.href); }

    static parse(url: string) {
        let protocolIndex = url.indexOf('//');
        let slashIndex = url.indexOf('/', protocolIndex + 2);
        let baseUrl = url.substring(0, slashIndex);
        let endIndex = url.indexOf('?');
        if (endIndex < 0) {
            endIndex = url.indexOf('#');
            if (endIndex < 0) {
                endIndex = url.length;
            }
        }
        else {
            endIndex = url.length;
        }
        let path = url.substring(slashIndex + 1, endIndex);
        let split = path.split('/');
        return new XtiUrl(
            baseUrl,
            new XtiPath(split[0], split[1], split[2], split[3], split[4])
        );
    }

    private constructor(baseUrl: string, path: XtiPath) {
        this.baseUrl = baseUrl;
        this.path = path;
    }

    readonly baseUrl: string;
    readonly path: XtiPath;

    url() {
        return new UrlBuilder(this.baseUrl)
            .addPart(this.path.app)
            .addPart(this.path.version)
            .addPart(this.path.group)
            .addPart(this.path.action)
            .addPart(this.path.modifier);
    }

    homeUrl() {
        return new UrlBuilder(this.baseUrl)
            .addPart(this.path.app)
            .addPart(this.path.version);
    }
}