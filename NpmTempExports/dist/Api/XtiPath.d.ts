export declare class XtiPath {
    static app(appKey: string, version: string, modifier: string): XtiPath;
    readonly app: string;
    readonly version: string;
    readonly group: string;
    readonly action: string;
    readonly modifier: string;
    private readonly value;
    constructor(app: string, version: string, group: string, action: string, modifier: string);
    withGroup(group: string): XtiPath;
    withAction(action: string): XtiPath;
    withModifier(modifier: string): XtiPath;
    format(): string;
    equals(other: XtiPath): boolean;
    toString(): string;
}
