export class JsonText {
    private readonly value: string;

    constructor(data: any) {
        this.formatDates(data);
        if (data === null) {
            this.value = null;
        }
        else if (typeof data === 'string') {
            this.value = `"${data}"`;
        }
        else if (data instanceof Date) {
            this.value = `"${data.toISOString()}"`;
        }
        else if (typeof data === 'number' || typeof data === 'boolean') {
            this.value = `${data}`;
        }
        else {
            this.value = JSON.stringify(data);
        }
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
            else if (typeof (obj) !== 'string' && typeof (obj) !== 'boolean' && typeof (obj) !== 'number') {
                for (const prop in obj) {
                    if (prop) {
                        const value = obj[prop];
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