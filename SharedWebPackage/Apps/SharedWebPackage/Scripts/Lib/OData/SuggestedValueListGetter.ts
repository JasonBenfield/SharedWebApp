import { ISuggestedValueGetter } from "./Types";

export class SuggestedValueListGetter implements ISuggestedValueGetter {
    private ignoreCase: boolean;
    private comparer: (inputValue, testValue, ignoreCase) => boolean = () => true;
    private readonly valuesToExclude: any[] = [];

    constructor(private readonly list: any[]) {
    }

    match(comparer: (inputValue, testValue, ignoreCase: boolean) => boolean) {
        this.comparer = comparer;
    }

    setIgnoreCase(ignoreCase: boolean) {
        this.ignoreCase = ignoreCase;
    }

    async getSuggestedValues(inputValue: any) {
        return new Promise<any[]>(
            (resolve) => {
                const list = [];
                for (const item of this.list) {
                    if (this.comparer(inputValue, item, this.ignoreCase) && !this.isExcluded(item)) {
                        list.push(item);
                    }
                }
                resolve(this.list);
            }
        );
    }

    private isExcluded(value: any) {
        return this.valuesToExclude.findIndex(value) > -1;
    }

    exclude(values: any[]) {
        this.valuesToExclude.splice(0, this.valuesToExclude.length, ...values);
    }
}