export interface ISerializableValueRangeBound<T> {
    readonly value: T;
    readonly isIncluded: boolean;
}

export class ValueRangeBound<T> {
    static deserialize<T>(serialized: ISerializableValueRangeBound<T>) {
        return serialized
            ? new ValueRangeBound(serialized.value, serialized.isIncluded)
            : null;
    }

    constructor(readonly value: T, readonly isIncluded: boolean) {
    }

    serialize() {
        const serialized: ISerializableValueRangeBound<T> = {
            value: this.value,
            isIncluded: this.isIncluded
        };
        return serialized;
    }
}