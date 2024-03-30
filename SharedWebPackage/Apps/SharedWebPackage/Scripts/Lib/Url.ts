import { UrlHash } from "./UrlHash";
import { UrlQuery } from "./UrlQuery";

export class Url {
    static current() { return new Url(location.href); }

    private readonly url: string;
    private readonly _query: UrlQuery;
    private readonly _hash: UrlHash;

    constructor(baseUrl: string) {
        this.url = baseUrl;
        const hashIndex = this.url.indexOf('#');
        this._hash = new UrlHash(hashIndex > -1 ? this.url.substring(hashIndex + 1) : '');
        if (hashIndex > -1) {
            this.url = this.url.substring(0, hashIndex);
        }
        const queryIndex = this.url.indexOf('?');
        this._query = new UrlQuery(queryIndex > -1 ? this.url.substring(queryIndex + 1) : '');
        if (queryIndex > -1) {
            this.url = this.url.substring(0, queryIndex);
        }
    }
    
    get query() {
        return this._query;
    }
    
    get hash() {
        return this._hash;
    }
    
    value() {
        let url = this.url;
        const queryString = this._query.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
        const hashString = this._hash.toString();
        if (hashString) {
            url += `#${hashString}`;
        }
        return url;
    }

    withoutQueryAndHash() {
        return this.url;
    }

    toString() {
        return this.value();
    }
}