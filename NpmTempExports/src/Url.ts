import { UrlHash } from "./UrlHash";
import { UrlQuery } from "./UrlQuery";

export class Url {
    static current() { return new Url(location.href); }

    private readonly url: string;
    private readonly _query: UrlQuery;
    private readonly _hash: UrlHash;

    constructor(baseUrl: string) {
        this.url = baseUrl;
        let hashIndex = this.url.indexOf('#');
        this._hash = new UrlHash(hashIndex > -1 ? this.url.substr(hashIndex + 1) : '');
        if (hashIndex > -1) {
            this.url = this.url.substr(0, hashIndex);
        }
        let queryIndex = this.url.indexOf('?');
        this._query = new UrlQuery(queryIndex > -1 ? this.url.substr(queryIndex + 1) : '');
        if (queryIndex > -1) {
            this.url = this.url.substr(0, queryIndex);
        }
    }

    hasQuery(name: string) {
        return this._query.hasQuery(name);
    }

    get query() {
        return this._query;
    }

    getQueryValue(name: string) {
        return this._query.getValue(name);
    }

    get hash() {
        return this._hash;
    }

    hasHash(name: string) {
        return this._hash.hasQuery(name);
    }

    getHashValue(name: string) {
        return this._hash.getValue(name);
    }

    value() {
        let url = this.url;
        let queryString = this._query.toString();
        if (queryString) {
            url += `?${queryString}`;
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