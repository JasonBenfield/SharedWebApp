export declare class CssClass implements ICssClass {
    private value;
    private readonly names;
    constructor(...initialNames: string[]);
    clear(): this;
    addFrom(cssClass: CssClass | ICssBuilder): this;
    addName(name: string): this;
    addNames(...names: string[]): this;
    private _addName;
    removeName(name: string): this;
    removeNames(...names: string[]): this;
    private _removeName;
    private updateValue;
    toString(): string;
}
