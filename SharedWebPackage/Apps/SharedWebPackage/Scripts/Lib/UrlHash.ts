import { DateOnly } from "./DateOnly";
import { DateTimeOffset } from "./DateTimeOffset";
import { JoinedStrings } from "./JoinedStrings";
import { NamedValue } from "./NamedValue";
import { TimeOnly } from "./TimeOnly";
import { TimeSpan } from "./TimeSpan";

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
        const parts = query.split('&');
        for (const part of parts) {
            const nameValue = part.split('=');
            const name = nameValue[0];
            let value = '';
            if (nameValue[1]) {
                value = nameValue[1];
            }
            this.hashValues.push(new NamedValue(name, value));
        }
    }

    private readonly hashValues: NamedValue[] = [];

    getValues() {
        return this.hashValues;
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
        let hashValue = this.hashValues.find(qv => qv.name === name);
        return hashValue ? hashValue.value : null;
    }

    clear() {
        this.hashValues.splice(0, this.hashValues.length);
        return this;
    }

    hasQuery(name: string) {
        let queryValue = this.hashValues.find(qv => qv.name === name);
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