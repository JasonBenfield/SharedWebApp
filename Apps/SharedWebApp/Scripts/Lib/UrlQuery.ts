import { NamedValue } from "./NamedValue";
import * as _ from 'lodash';
import { JoinedStrings } from "./JoinedStrings";

export class UrlQuery {
    constructor(query: string | NamedValue[]) {
        if (query) {
            if (typeof query === 'string') {
                this.pushQueryValues(query);
            }
            else {
                this.queryValues = query;
            }
        }
    }

    private readonly queryValues: NamedValue[] = [];

    getValues() {
        return this.queryValues;
    }

    getValue(name: string) {
        let queryValue = _(this.queryValues).find(qv => qv.name === name);
        return queryValue ? queryValue.value : null;
    }

    private pushQueryValues(query: string) {
        let parts = query.split('&');
        _(parts).forEach(part => {
            let nameValue = part.split('=');
            let name = nameValue[0];
            let value = '';
            if (nameValue[1]) {
                value = nameValue[1];
            }
            this.queryValues.push(new NamedValue(name, value));
        });
    }

    hasQuery(name: string) {
        let queryValue = _(this.queryValues).find(qv => qv.name === name);
        return Boolean(queryValue);
    }

    toString() {
        let str = '';
        if (this.queryValues.length > 0) {
            str = new JoinedStrings('&', this.queryValues).value();
        }
        return str;
    }
}