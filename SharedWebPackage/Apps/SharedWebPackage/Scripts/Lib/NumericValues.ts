import { NumericValue } from "./NumericValue";

export class NumericValues<T extends NumericValue> {
    constructor(public readonly all: T[]) {
    }

    value(testValue: number | string | INumericValue) {
        return this.all.find(nv => nv.equals(testValue)) || this.all[0];
    }
}