import { NamedValue } from "./NamedValue";
import * as _ from 'lodash';
import { UrlHash } from "./UrlHash";
import { DateOnly } from "./DateOnly";
import { TimeOnly } from "./TimeOnly";
import { TimeSpan } from "./TimeSpan";
import { DateTimeOffset } from "./DateTimeOffset";

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

    getNumberValue(name: string) {
        const text = this.getValue(name);
        return text ? Number(text) : null;
    }

    getBooleanValue(name: string) {
        let text = this.getValue(name);
        if (text) {
            text = text.toLowerCase();
        }
        return text === 'true' || text === 'yes' || text === 'y' || text === '1';
    }

    getDateTimeValue(name: string) {
        const text = this.getValue(name);
        return DateTimeOffset.canParse(text) ? DateTimeOffset.parse(text) : null;
    }

    getDateValue(name: string) {
        const text = this.getValue(name);
        return DateOnly.canParse(text) ? DateOnly.parse(text) : null;
    }

    getTimeValue(name: string) {
        const text = this.getValue(name);
        return TimeOnly.canParse(text) ? TimeOnly.parse(text) : null;
    }

    getTimeSpanValue(name: string) {
        const text = this.getValue(name);
        return TimeSpan.canParse(text) ? TimeSpan.parse(text) : null;
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
    replaceQuery(name: string, value: DateOnly): UrlHashBuilder;
    replaceQuery(name: string, value: TimeOnly): UrlHashBuilder;
    replaceQuery(name: string, value: TimeSpan): UrlHashBuilder;
    replaceQuery(name: string, value: DateTimeOffset): UrlHashBuilder;
    replaceQuery(name: string, value: number): UrlHashBuilder;
    replaceQuery(name: string, value: any) {
        this.removeQuery(name);
        return this.addQuery(name, value);
    }

    addQuery(name: string, value: string[]): UrlHashBuilder;
    addQuery(name: string, value: string): UrlHashBuilder;
    addQuery(name: string, value: Date): UrlHashBuilder;
    addQuery(name: string, value: DateOnly): UrlHashBuilder;
    addQuery(name: string, value: TimeOnly): UrlHashBuilder;
    addQuery(name: string, value: TimeSpan): UrlHashBuilder;
    addQuery(name: string, value: DateTimeOffset): UrlHashBuilder;
    addQuery(name: string, value: number): UrlHashBuilder;
    addQuery(name: string, value: any) {
        let hashValues = this._hash.getValues();
        if (name) {
            if (value instanceof Date || value instanceof DateOnly || value instanceof DateTimeOffset || value instanceof TimeOnly || value instanceof TimeSpan) {
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
                for(const arrValue of value) {
                    this.addQuery(name, arrValue);
                }
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
            for (const prop in obj) {
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