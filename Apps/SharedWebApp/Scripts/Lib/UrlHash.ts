import { NamedValue } from "./NamedValue";
import * as _ from 'lodash';
import { JoinedStrings } from "./JoinedStrings";

export class UrlHash {
    constructor(hash: string | NamedValue[]) {
        if (hash) {
            if (typeof hash === 'string') {
                this.pushHashValues(hash);
            }
            else {
                this.hashValues = hash;
            }
        }
    }

    private pushHashValues(query: string) {
        let parts = query.split('&');
        _(parts).forEach(part => {
            let nameValue = part.split('=');
            let name = nameValue[0];
            let value = '';
            if (nameValue[1]) {
                value = nameValue[1];
            }
            this.hashValues.push(new NamedValue(name, value));
        });
    }

    private readonly hashValues: NamedValue[] = [];

    getValues() {
        return this.hashValues;
    }

    getValue(name: string) {
        let hashValue = _(this.hashValues).find(qv => qv.name === name);
        return hashValue ? hashValue.value : null;
    }

    clear() {
        this.hashValues.splice(0, this.hashValues.length);
        return this;
    }

    hasQuery(name: string) {
        let queryValue = _(this.hashValues).find(qv => qv.name === name);
        return Boolean(queryValue);
    }

    toString() {
        let str = '';
        if (this.hashValues.length > 0) {
            str = new JoinedStrings('&', this.hashValues).value();
        }
        return str;
    }
}