import * as _ from 'lodash';

export class DebouncedAction<TResult> {
    private readonly debounced: _.DebouncedFunc<(...args: any) => TResult>;

    constructor(
        func: (...args: any) => TResult,
        wait?: number
    ) {
        this.debounced = _.debounce(func, wait);
    }

    execute(...args: any[]) {
        return this.debounced(...args);
    }
}