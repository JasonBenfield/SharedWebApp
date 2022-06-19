import * as _ from 'lodash';

export interface IEnumerable<T> {
    value(): T[];
}

export class EnumerableArray<T> implements IEnumerable<T> {
    static toEnumerable<T>(source: T[] | IEnumerable<T>) {
        if (_.isArray(source)) {
            return new EnumerableArray(source);
        }
        return source;
    }

    private readonly source: T[];

    constructor(source: T[] | IEnumerable<T>) {
        if (_.isArray(source)) {
            this.source = [];
            const arr = <T[]>source;
            this.source.push(...arr);
        }
        else {
            const enumerable = <IEnumerable<T>>source;
            this.source = enumerable.value();
        }
    }

    value() { return this.source; }

    isArray() { return _.isArray(this.source); }

    any() { return this.value().length > 0; }

    first() { return this.value()[0]; }

    contains(item: T) { return this.indexOf(item) > -1; }

    indexOf(item: T, fromIndex?: number) {
        return _(this.value()).indexOf(item, fromIndex);
    }

}

export class MappedArray<T, TResult> implements IEnumerable<TResult> {
    private readonly source: IEnumerable<T>;

    constructor(
        source: T[] | IEnumerable<T>,
        private readonly map: (item: T) => TResult
    ) {
        this.source = EnumerableArray.toEnumerable(source);
    }

    value() { return _.map(this.source.value(), this.map); }

    toEnumerableArray() { return new EnumerableArray(this.value()); }
}

export class FilteredArray<T> implements IEnumerable<T> {
    private readonly source: IEnumerable<T>;

    constructor(
        source: T[] | IEnumerable<T>,
        private readonly isMatch: (item: T) => boolean
    ) {
        this.source = EnumerableArray.toEnumerable(source);
    }

    value() { return _.filter(this.source.value(), this.isMatch); }

    toEnumerableArray() { return new EnumerableArray(this.value()); }
}

export class First<T> {
    private readonly source: IEnumerable<T>;

    constructor(
        source: T[] | IEnumerable<T>
    ) {
        this.source = EnumerableArray.toEnumerable(source);
    }

    value() { return this.source.value()[0]; }
}

export class Any<T> {
    private readonly source: IEnumerable<T>;

    constructor(
        source: T[] | IEnumerable<T>
    ) {
        this.source = EnumerableArray.toEnumerable(source);
    }

    value() { return this.source.value().length > 0; }
}

export class EnumerableRange implements IEnumerable<number> {
    private readonly source: number[] = [];

    constructor(start: number, count: number) {
        for (let i = start; i < start + count; i++) {
            this.source.push(i);
        }
    }

    value() { return this.source; }

    toEnumerableArray() { return new EnumerableArray(this.value()); }
}