import { CssClass } from "./CssClass";
export declare class FlexCss implements ICssBuilder {
    private readonly _direction;
    private readonly _fill;
    private readonly _wrap;
    direction(configure: (dir: FlexDirection) => void): void;
    row(): this;
    column(): this;
    fill(configure?: (fill: FlexFill) => void): this;
    wrap(configure?: (wrap: FlexWrap) => void): this;
    wrapReverse(): this;
    nowrap(): this;
    cssClass(): CssClass;
}
export declare class FlexFill {
    private readonly fill;
    xs(): this;
    sm(): this;
    md(): this;
    lg(): this;
    xl(): this;
    xxl(): this;
    getCssClass(): CssClass;
    private cssClassName;
}
export declare class FlexDirection {
    private readonly dir;
    private isReversed;
    constructor(xs?: FlexDirections);
    xs(value: FlexDirections): this;
    sm(value: FlexDirections): this;
    md(value: FlexDirections): this;
    lg(value: FlexDirections): this;
    xl(value: FlexDirections): this;
    xxl(value: FlexDirections): this;
    reverse(): this;
    getCssClass(): CssClass;
    private cssClassName;
}
export declare class FlexWrap {
    private readonly wrap;
    constructor(xs?: FlexWraps);
    xs(value: FlexWraps): this;
    sm(value: FlexWraps): this;
    md(value: FlexWraps): this;
    lg(value: FlexWraps): this;
    xl(value: FlexWraps): this;
    xxl(value: FlexWraps): this;
    getCssClass(): CssClass;
    private cssClassName;
}
