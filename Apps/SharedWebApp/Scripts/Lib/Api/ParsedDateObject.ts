
export class ParsedDateObject {
    private static dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.?\d{0,7}[\+\-]\d{2}:\d{2})?$/;

    static isDateString(str: string) {
        return ParsedDateObject.dateRegex.test(str);
    }

    constructor(obj: any) {
        this.value = this.parseDates(obj);
    }

    readonly value: any;

    private parseDates(obj: any) {
        if (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (let i = 0; i < obj.length; i++) {
                    let el = obj[i];
                    if (typeof el === 'string') {
                        if (ParsedDateObject.dateRegex.test(el)) {
                            obj[i] = new Date(Date.parse(el));
                        }
                    }
                    else {
                        this.parseDates(el);
                    }
                }
            }
            else if (typeof (obj) !== 'string' && typeof (obj) !== 'boolean' && typeof (obj) !== 'number') {
                for (let prop in obj) {
                    if (prop) {
                        let value = obj[prop];
                        if (typeof value === 'string') {
                            if (ParsedDateObject.dateRegex.test(value)) {
                                obj[prop] = new Date(Date.parse(value));
                            }
                        }
                        else {
                            this.parseDates(value);
                        }
                    }
                }
            }
        }
        return obj;
    }
}