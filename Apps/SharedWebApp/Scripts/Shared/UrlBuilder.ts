import { UrlQueryBuilder } from "./UrlQueryBuilder";
import { JoinedStrings } from "./JoinedStrings";
import { Url } from "./Url";
import { UrlHashBuilder } from "./UrlHashBuilder";

export class UrlBuilder {
    static current() { return new UrlBuilder(location.href); }

    constructor(baseUrl: string) {
        this._url = new Url(baseUrl);
        this._query = new UrlQueryBuilder(this._url.query);
        this._hash = new UrlHashBuilder(this._url.hash);
    }

    private _url: Url;
    private readonly _query: UrlQueryBuilder;
    private readonly _hash: UrlHashBuilder;

    get url() { return this._url; }

    addPart(part: string) {
        if (part) {
            let hashIndex = part.indexOf('#');
            if (hashIndex > -1) {
                let hashValue = part.substr(hashIndex + 1);
                this.addHashString(hashValue);
                part = part.substr(0, hashIndex);
            }
            let queryIndex = part.indexOf('?');
            if (queryIndex > -1) {
                let query = part.substr(queryIndex + 1);
                this.addQueryString(query);
                part = part.substr(0, queryIndex);
            }
            let baseUrl = this._url.withoutQueryAndHash();
            if (baseUrl.substr(baseUrl.length - 1) === '/') {
                baseUrl = baseUrl.substr(0, baseUrl.length - 1);
            }
            let parts = [baseUrl];
            let fragments = part.split('/');
            for (let fragment of fragments) {
                if (fragment) {
                    parts.push(fragment);
                }
            }
            this._url = new Url(new JoinedStrings('/', parts).value());
        }
        return this;
    }

    hasQuery(name: string) {
        return this._query.hasQuery(name);
    }

    clearQuery() {
        this._query.clear();
        return this;
    }

    removeQuery(name: string) {
        this._query.removeQuery(name);
        return this;
    }

    replaceQuery(name: string, value: string[]): UrlBuilder;
    replaceQuery(name: string, value: string): UrlBuilder;
    replaceQuery(name: string, value: Date): UrlBuilder;
    replaceQuery(name: string, value: number): UrlBuilder;
    replaceQuery(name: string, value: any) {
        this._query.replaceQuery(name, value);
        return this;
    }

    addQuery(name: string, value: string[]): UrlBuilder;
    addQuery(name: string, value: string): UrlBuilder;
    addQuery(name: string, value: Date): UrlBuilder;
    addQuery(name: string, value: number): UrlBuilder;
    addQuery(name: string, value: any) {
        this._query.addQuery(name, value);
        return this;
    }

    addQueryString(query: string) {
        this._query.addQueryString(query);
        return this;
    }

    addQueryFromObject(obj: any) {
        this._query.addQueryFromObject(obj);
        return this;
    }

    getQuery() {
        return this._query;
    }

    getQueryValue(name: string) {
        return this._query.getValue(name);
    }

    hasHash(name: string) {
        return this._hash.hasQuery(name);
    }

    clearHash() {
        this._hash.clear();
    }

    removeHash(name: string) {
        this._hash.removeQuery(name);
        return this;
    }

    replaceHash(name: string, value: string[]): UrlBuilder;
    replaceHash(name: string, value: string): UrlBuilder;
    replaceHash(name: string, value: Date): UrlBuilder;
    replaceHash(name: string, value: number): UrlBuilder;
    replaceHash(name: string, value: any) {
        this._hash.replaceQuery(name, value);
        return this;
    }

    addHash(name: string, value: string[]): UrlBuilder;
    addHash(name: string, value: string): UrlBuilder;
    addHash(name: string, value: Date): UrlBuilder;
    addHash(name: string, value: number): UrlBuilder;
    addHash(name: string, value: any) {
        this._hash.addQuery(name, value);
        return this;
    }

    addHashString(query: string) {
        this._hash.addQueryString(query);
        return this;
    }

    addHashFromObject(obj: any) {
        this._hash.addQueryFromObject(obj);
        return this;
    }

    get hash() {
        return this._hash;
    }

    getHashValue(name: string) {
        return this._hash.getValue(name);
    }

    value() {
        return this._url.value();
    }

    withoutQueryAndHash() {
        return this._url;
    }

    toString() {
        return this.value();
    }
}