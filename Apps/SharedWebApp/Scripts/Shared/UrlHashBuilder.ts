import { NamedValue } from "./NamedValue";
import * as _ from 'lodash';
import { UrlHash } from "./UrlHash";

export class UrlHashBuilder {
    private _hash: UrlHash;

    constructor(hash: string | UrlHash) {
        if (typeof hash === 'string') {
            this._hash = new UrlHash(hash);
        }
        else {
            this._hash = hash;
        }
    }

    get hash() { return this._hash; }

    getValues() {
        return this._hash.getValues();
    }

    getValue(name: string) {
        return this._hash.getValue(name);
    }

    clear() {
        this._hash = new UrlHash('');
        return this;
    }

    hasQuery(name: string) {
        return this._hash.hasQuery(name);
    }

    removeQuery(name: string) {
        let hashValues = this._hash.getValues();
        for (let i = hashValues.length - 1; i >= 0; i--) {
            let queryPart = hashValues[i];
            if (queryPart.name === name) {
                hashValues.splice(i, 1);
            }
        }
        this._hash = new UrlHash(hashValues);
        return this;
    }

    replaceQuery(name: string, value: string[]): UrlHashBuilder;
    replaceQuery(name: string, value: string): UrlHashBuilder;
    replaceQuery(name: string, value: Date): UrlHashBuilder;
    replaceQuery(name: string, value: number): UrlHashBuilder;
    replaceQuery(name: string, value: any) {
        this.removeQuery(name);
        return this.addQuery(name, value);
    }

    addQuery(name: string, value: string[]): UrlHashBuilder;
    addQuery(name: string, value: string): UrlHashBuilder;
    addQuery(name: string, value: Date): UrlHashBuilder;
    addQuery(name: string, value: number): UrlHashBuilder;
    addQuery(name: string, value: any) {
        let hashValues = this._hash.getValues();
        if (name) {
            if (value instanceof Date) {
                let queryValue = value === undefined || value === null
                    ? null
                    : value.toISOString();
                hashValues.push(new NamedValue(name, queryValue));
            }
            else if (typeof value === 'string') {
                let queryValue: string;
                if (value !== undefined && value !== null) {
                    queryValue = value;
                }
                hashValues.push(new NamedValue(name, queryValue));
            }
            else if (typeof value === 'number') {
                let queryValue: string;
                if (value !== undefined && value !== null) {
                    queryValue = value.toString();
                }
                hashValues.push(new NamedValue(name, queryValue));
            }
            else if (_.isArray(value)) {
                _(value).forEach(arrValue => {
                    this.addQuery(name, arrValue);
                });
            }
            else {
                hashValues.push(new NamedValue(name, value && value.toString()));
            }
        }
        this._hash = new UrlHash(hashValues);
        return this;
    }

    addQueryFromObject(obj: any) {
        return this._addQueryFromObject(obj, '');
    }

    private _addQueryFromObject(obj: any, prefix: string) {
        if (obj) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    let k = prefix ? `${prefix}[${prop}]` : prop;
                    let propValue = obj[prop];
                    if (propValue !== null && typeof propValue === "object") {
                        this._addQueryFromObject(propValue, k)
                    }
                    else {
                        this.addQuery(k, propValue);
                    }
                }
            }
        }
    }

    addQueryString(query: string) {
        this._hash = new UrlHash(query);
        return this;
    }

    toString() {
        return this._hash.toString();
    }
}