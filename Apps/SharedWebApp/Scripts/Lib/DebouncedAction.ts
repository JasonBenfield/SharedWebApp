import * as _ from 'lodash';

export class DebouncedAction {
    private readonly debounced: _.DebouncedFunc<(...args: any) => void>;

    constructor(
        func: (...args: any) => void,
        wait?: number
    ) {
        this.debounced = _.debounce(func, wait);
    }

    execute(...args: any[]) {
        return this.debounced(...args);
    }
}