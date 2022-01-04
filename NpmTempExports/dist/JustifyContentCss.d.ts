import { CssClass } from "./CssClass";
export declare class JustifyContentCss implements ICssBuilder {
    static start(): JustifyContentCss;
    static end(): JustifyContentCss;
    static center(): JustifyContentCss;
    private readonly justify;
    constructor(xs?: ContentJustifications);
    xs(value: ContentJustifications): this;
    sm(value: ContentJustifications): this;
    md(value: ContentJustifications): this;
    lg(value: ContentJustifications): this;
    xl(value: ContentJustifications): this;
    xxl(value: ContentJustifications): this;
    cssClass(): CssClass;
    private cssClassName;
}
