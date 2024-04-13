import { NamedValue } from "./NamedValue";
import { JoinedStrings } from "./JoinedStrings";
import { TimeSpan } from "./TimeSpan";
import { TimeOnly } from "./TimeOnly";
import { DateOnly } from "./DateOnly";
import { DateTimeOffset } from "./DateTimeOffset";

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

    getNumberValue(name: string) {
        const text = this.getValue(name);
        const value = text ? Number(text) : null;
        return value && Number.isNaN(value) ? null : value;
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