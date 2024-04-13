
export class JoinedStrings {
    private readonly format: (any) => string;

    private static defaultFormat(value: string) {
        return value ? value.toString() : '';
    }

    constructor(
        private readonly separator: string,
        private readonly arr: any[],
        format?: (value: any) => string) {
        this.format = format || JoinedStrings.defaultFormat;
    }

    value() {
        let result = '';
        for (const value of this.arr) {
            if (result !== '') {
                result += this.separator;
            }
            result += this.format(value);
        }
        return result;
    }

    toString() {
        return this.value();
    }
}