export class JsonText {
    private readonly value: string;

    constructor(data: any) {
        this.formatDates(data);
        this.value = JSON.stringify(data);
    }

    private formatDates(obj: any) {
        if (obj) {
            if (Object.prototype.toString.call(obj) === '[object Array]') {
                for (let i = 0; i < obj.length; i++) {
                    let el = obj[i];
                    if (el instanceof Date) {
                        obj[i] = el.toISOString();
                    }
                    else {
                        this.formatDates(el);
                    }
                }
            }
            else if(typeof(obj) !== 'string' && typeof(obj) !== 'boolean' && typeof(obj) !== 'number') {
                for (let prop in obj) {
                    if (prop) {
                        let value = obj[prop];
                        if (value instanceof Date) {
                            obj[prop] = value.toISOString();
                        }
                        else {
                            this.formatDates(value);
                        }
                    }
                }
            }
        }
    }

    toString() {
        return this.value;
    }
}