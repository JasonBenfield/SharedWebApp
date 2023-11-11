import { NamedValue } from "./NamedValue";
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
        const queryValue = this.queryValues.find(qv => qv.name === name);
        return queryValue ? queryValue.value : null;
    }

    private pushQueryValues(query: string) {
        const parts = query.split('&');
        for(const part of parts) {
            const nameValue = part.split('=');
            const name = nameValue[0];
            let value = '';
            if (nameValue[1]) {
                value = nameValue[1];
            }
            this.queryValues.push(new NamedValue(name, value));
        }
    }

    hasQuery(name: string) {
        let queryValue = this.queryValues.find(qv => qv.name === name);
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