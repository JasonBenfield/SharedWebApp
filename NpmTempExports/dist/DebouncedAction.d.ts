export declare class DebouncedAction {
    private readonly debounced;
    constructor(func: (...args: any) => void, wait?: number);
    execute(...args: any[]): void;
}
