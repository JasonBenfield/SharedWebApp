import { UrlQueryBuilder } from "./UrlQueryBuilder";
import { JoinedStrings } from "./JoinedStrings";
import { Url } from "./Url";
import { UrlHashBuilder } from "./UrlHashBuilder";
import { DateTimeOffset } from "./DateTimeOffset";
import { DateOnly } from "./DateOnly";
import { TimeOnly } from "./TimeOnly";
import { TimeSpan } from "./TimeSpan";

export class UrlBuilder {
    static current() { return new UrlBuilder(location.href); }

    private _url: Url;
    private readonly _query: UrlQueryBuilder;
    private readonly _hash: UrlHashBuilder;

    constructor(baseUrl: string | Url | UrlBuilder) {
        let url: string;
        if (baseUrl instanceof Url) {
            url = baseUrl.value();
        }
        else if (baseUrl instanceof UrlBuilder) {
            url = baseUrl.value();
        }
        else {
            url = baseUrl;
        }
        const hashIndex = url.indexOf("#");
        this._hash = new UrlHashBuilder(hashIndex > -1 ? url.substring(hashIndex + 1) : "");
        if (hashIndex > -1) {
            url = url.substring(0, hashIndex);
        }
        const queryIndex = url.indexOf("?");
        this._query = new UrlQueryBuilder(queryIndex > -1 ? url.substring(queryIndex + 1) : "");
        if (queryIndex > -1) {
            url = url.substring(0, queryIndex);
        }
        this._url = new Url(url);
    }

    get url() { return new Url(this.value()); }

    addPart(part: string) {
        if (part) {
            const hashIndex = part.indexOf("#");
            if (hashIndex > -1) {
                let hashValue = part.substring(hashIndex + 1);
                this.addHashString(hashValue);
                part = part.substring(0, hashIndex);
            }
            const queryIndex = part.indexOf("?");
            if (queryIndex > -1) {
                const query = part.substring(queryIndex + 1);
                this.addQueryString(query);
                part = part.substring(0, queryIndex);
            }
            let baseUrl = this._url.withoutQueryAndHash();
            if (baseUrl.substring(baseUrl.length - 1) === "/") {
                baseUrl = baseUrl.substring(0, baseUrl.length - 1);
            }
            const parts = [baseUrl];
            const fragments = part.split("/");
            for (const fragment of fragments) {
                if (fragment) {
                    parts.push(fragment);
                }
            }
            this._url = new Url(new JoinedStrings("/", parts).value());
        }
        return this;
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
    replaceQuery(name: string, value: string | null): UrlBuilder;
    replaceQuery(name: string, value: Date | null): UrlBuilder;
    replaceQuery(name: string, value: DateOnly | null): UrlBuilder;
    replaceQuery(name: string, value: TimeOnly | null): UrlBuilder;
    replaceQuery(name: string, value: TimeSpan | null): UrlBuilder;
    replaceQuery(name: string, value: DateTimeOffset | null): UrlBuilder;
    replaceQuery(name: string, value: number | null): UrlBuilder;
    replaceQuery(name: string, value: any) {
        this._query.replaceQuery(name, value);
        return this;
    }

    addQuery(name: string, value: string[]): UrlBuilder;
    addQuery(name: string, value: string | null): UrlBuilder;
    addQuery(name: string, value: Date | null): UrlBuilder;
    addQuery(name: string, value: DateOnly | null): UrlBuilder;
    addQuery(name: string, value: TimeOnly | null): UrlBuilder;
    addQuery(name: string, value: TimeSpan | null): UrlBuilder;
    addQuery(name: string, value: DateTimeOffset | null): UrlBuilder;
    addQuery(name: string, value: number | null): UrlBuilder;
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

    get query() {
        return this._query;
    }
    
    hasHash(name: string) {
        return this._hash.hasQuery(name);
    }

    clearHash() {
        this._hash.clear();
        return this;
    }

    removeHash(name: string) {
        this._hash.removeQuery(name);
        return this;
    }

    replaceHash(name: string, value: string[]): UrlBuilder;
    replaceHash(name: string, value: string | null): UrlBuilder;
    replaceHash(name: string, value: Date | null): UrlBuilder;
    replaceHash(name: string, value: DateOnly | null): UrlBuilder;
    replaceHash(name: string, value: TimeOnly | null): UrlBuilder;
    replaceHash(name: string, value: TimeSpan | null): UrlBuilder;
    replaceHash(name: string, value: DateTimeOffset | null): UrlBuilder;
    replaceHash(name: string, value: number | null): UrlBuilder;
    replaceHash(name: string, value: any) {
        this._hash.replaceQuery(name, value);
        return this;
    }

    addHash(name: string, value: string[]): UrlBuilder;
    addHash(name: string, value: string | null): UrlBuilder;
    addHash(name: string, value: Date | null): UrlBuilder;
    addHash(name: string, value: DateOnly | null): UrlBuilder;
    addHash(name: string, value: TimeOnly | null): UrlBuilder;
    addHash(name: string, value: TimeSpan | null): UrlBuilder;
    addHash(name: string, value: DateTimeOffset | null): UrlBuilder;
    addHash(name: string, value: number | null): UrlBuilder;
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
        let url = this._url.value();
        const query = this._query.toString();
        if (query) {
            url += `?${query}`;
        }
        const hash = this._hash.toString();
        if (hash) {
            url += `#${hash}`;
        }
        return url;
    }

    withoutQueryAndHash() {
        return this._url;
    }

    toString() {
        return this.value();
    }
}