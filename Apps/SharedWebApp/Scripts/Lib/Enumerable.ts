import * as _ from 'lodash';

export interface IEnumerable<T> {
    value(): T[];
}

export class EnumerableArray<T> implements IEnumerable<T> {
    static create<T>(source: T[] | IEnumerable<T>) {
        if (_.isArray(source)) {
            return new EnumerableArray(source);
        }
        return source;
    }

    constructor(private readonly source: T[] | IEnumerable<T>) {
    }

    value() {
        if (_.isArray(this.source)) {
            return this.source;
        }
        return this.source.value();
    }

    isArray() { return _.isArray(this.source); }

    any() { return this.value().length > 0; }

    first() { return this.value()[0]; }

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
        this.source = EnumerableArray.create(source);
    }

    value() { return _.map(this.source.value(), this.map); }

    asEnumerable() { return new EnumerableArray(this.value()); }
}

export class FilteredArray<T> implements IEnumerable<T> {
    constructor(
        source: T[] | IEnumerable<T>,
        private readonly isMatch: (item: T) => boolean
    ) {
        this.source = EnumerableArray.create(source);
    }

    private readonly source: IEnumerable<T>;

    value() { return _.filter(this.source.value(), this.isMatch); }

    asEnumerable() { return new EnumerableArray(this.value()); }
}

export class First<T> {
    constructor(
        source: T[] | IEnumerable<T>
    ) {
        this.source = EnumerableArray.create(source);
    }

    private readonly source: IEnumerable<T>;

    value() { return this.source.value()[0]; }
}

export class Any<T> {
    constructor(
        source: T[] | IEnumerable<T>
    ) {
        this.source = EnumerableArray.create(source);
    }

    private readonly source: IEnumerable<T>;

    value() { return this.source.value().length > 0; }
}

export class EnumerableRange implements IEnumerable<number> {
    constructor(start: number, count: number) {
        for (let i = start; i < start + count; i++) {
            this.source.push(i);
        }
    }

    private readonly source: number[] = [];

    value() { return this.source; }

    asEnumerable() { return new EnumerableArray(this.value()); }
}