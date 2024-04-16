import * as _ from 'lodash';
import { DateOnly } from './DateOnly';
import { DateTimeOffset } from './DateTimeOffset';
import { NamedValue } from "./NamedValue";
import { TimeOnly } from './TimeOnly';
import { TimeSpan } from './TimeSpan';
import { UrlQuery } from "./UrlQuery";

export class UrlQueryBuilder {
    private _query: UrlQuery;

    constructor(query: string | UrlQuery) {
        if (typeof query === 'string') {
            this._query = new UrlQuery(query);
        }
        else {
            this._query = query;
        }
    }

    get query() { return this._query; }

    getValues() {
        return this._query.getValues();
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
        return this._query.getValue(name);
    }

    clear() {
        this._query = new UrlQuery('');
        return this;
    }

    hasQuery(name: string) {
        return this._query.hasQuery(name);
    }

    removeQuery(name: string) {
        const queryValues = this._query.getValues();
        for (let i = queryValues.length - 1; i >= 0; i--) {
            const queryPart = queryValues[i];
            if (queryPart.name === name) {
                queryValues.splice(i, 1);
            }
        }
        this._query = new UrlQuery(queryValues);
        return this;
    }

    replaceQuery(name: string, value: string[]): UrlQueryBuilder;
    replaceQuery(name: string, value: string): UrlQueryBuilder;
    replaceQuery(name: string, value: Date): UrlQueryBuilder;
    replaceQuery(name: string, value: DateOnly): UrlQueryBuilder;
    replaceQuery(name: string, value: TimeOnly): UrlQueryBuilder;
    replaceQuery(name: string, value: TimeSpan): UrlQueryBuilder;
    replaceQuery(name: string, value: DateTimeOffset): UrlQueryBuilder;
    replaceQuery(name: string, value: number): UrlQueryBuilder;
    replaceQuery(name: string, value: any) {
        this.removeQuery(name);
        return this.addQuery(name, value);
    }

    addQuery(name: string, value: string[]): UrlQueryBuilder;
    addQuery(name: string, value: string): UrlQueryBuilder;
    addQuery(name: string, value: Date): UrlQueryBuilder;
    addQuery(name: string, value: DateOnly): UrlQueryBuilder;
    addQuery(name: string, value: TimeOnly): UrlQueryBuilder;
    addQuery(name: string, value: DateTimeOffset): UrlQueryBuilder;
    addQuery(name: string, value: TimeSpan): UrlQueryBuilder;
    addQuery(name: string, value: number): UrlQueryBuilder;
    addQuery(name: string, value: any) {
        const queryValues = this._query.getValues();
        if (name && value !== undefined && value !== null) {
            if (value instanceof Date || value instanceof DateOnly || value instanceof DateTimeOffset || value instanceof TimeOnly || value instanceof TimeSpan) {
                queryValues.push(new NamedValue(name, value.toISOString()));
            }
            else if (typeof value === 'string') {
                queryValues.push(new NamedValue(name, value));
            }
            else if (typeof value === 'number') {
                queryValues.push(new NamedValue(name, value.toString()));
            }
            else if (_.isArray(value)) {
                for (const arrValue of value) {
                    this.addQuery(name, arrValue);
                }
            }
            else {
                queryValues.push(new NamedValue(name, value && value.toString()));
            }
        }
        this._query = new UrlQuery(queryValues);
        return this;
    }

    addQueryFromObject(obj: any) {
        return this._addQueryFromObject(obj, '');
    }

    private _addQueryFromObject(obj: any, prefix: string) {
        if (obj) {
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    const k = prefix ? `${prefix}[${prop}]` : prop;
                    const propValue = obj[prop];
                    if (propValue !== null && typeof propValue === "object" && !this.isKnownObject(propValue)) {
                        this._addQueryFromObject(propValue, k)
                    }
                    else {
                        this.addQuery(k, propValue);
                    }
                }
            }
        }
    }

    private isKnownObject(obj: any) {
        return obj instanceof Date || obj instanceof DateOnly || obj instanceof DateTimeOffset || obj instanceof TimeOnly || obj instanceof TimeSpan;
    }

    addQueryString(query: string) {
        this._query = new UrlQuery(query);
        return this;
    }

    toString() {
        return this._query.toString();
    }
}