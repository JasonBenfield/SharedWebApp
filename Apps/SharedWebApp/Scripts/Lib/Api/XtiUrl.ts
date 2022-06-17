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
        if (split[2] !== 'odata') {
            split.splice(3, 0, '');
        }
        return new XtiUrl(
            baseUrl,
            new XtiPath(split[0], split[1], split[2], split[3], split[4], split[5])
        );
    }

    private readonly _baseUrl: string;
    readonly path: XtiPath;

    private constructor(baseUrl: string, path: XtiPath) {
        this._baseUrl = baseUrl;
        this.path = path;
    }

    url() {
        return this.versionUrl()
            .addPart(this.path.group)
            .addPart(this.path.action)
            .addPart(this.path.modifier);
    }

    homeUrl() {
        return this.versionUrl();
    }

    versionUrl() {
        return new UrlBuilder(this._baseUrl)
            .addPart(this.path.app)
            .addPart(this.path.version);
    }

}