import * as _ from 'lodash';
import { NamedValue } from "./NamedValue";
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
    replaceQuery(name: string, value: number): UrlQueryBuilder;
    replaceQuery(name: string, value: any) {
        this.removeQuery(name);
        return this.addQuery(name, value);
    }

    addQuery(name: string, value: string[]): UrlQueryBuilder;
    addQuery(name: string, value: string): UrlQueryBuilder;
    addQuery(name: string, value: Date): UrlQueryBuilder;
    addQuery(name: string, value: number): UrlQueryBuilder;
    addQuery(name: string, value: any) {
        const queryValues = this._query.getValues();
        if (name && value !== undefined && value !== null) {
            if (value instanceof Date) {
                queryValues.push(new NamedValue(name, value.toISOString()));
            }
            else if (typeof value === 'string') {
                queryValues.push(new NamedValue(name, value));
            }
            else if (typeof value === 'number') {
                queryValues.push(new NamedValue(name, value.toString()));
            }
            else if (_.isArray(value)) {
                _(value).forEach(arrValue => {
                    this.addQuery(name, arrValue);
                });
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
                    if (propValue !== null && typeof propValue === "object" && !(propValue instanceof Date)) {
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
        this._query = new UrlQuery(query);
        return this;
    }

    toString() {
        return this._query.toString();
    }
}