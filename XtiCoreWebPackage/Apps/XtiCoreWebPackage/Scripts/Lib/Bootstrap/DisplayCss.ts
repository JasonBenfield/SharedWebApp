import { CssClass } from "../CssClass";

export type DisplayTypes =
    "block" | "inline" | "inline-block" | "contents" | "flex" | "inline-flex" |
    "grid" | "inline-grid" | "table" | "table-cell" | "table-row";

export class DisplayCss extends CssClass {
    static remove() { return new DisplayCss().remove(); }

    static block(isInline = false) { return DisplayCss.xs(isInline ? "inline-block" : "block"); }

    static inline() { return DisplayCss.xs("inline");}

    static flex(isInline = false) { return DisplayCss.xs(isInline ? "inline-flex" : "flex"); }

    static contents() { return DisplayCss.xs("contents"); }

    static grid(isInline = false) { return DisplayCss.xs(isInline ? "inline-grid" : "grid"); }

    static table() { return DisplayCss.xs("table"); }

    static tableCell() { return DisplayCss.xs("table-cell"); }

    static tableRow() { return DisplayCss.xs("table-row"); }

    static xs(displayType: DisplayTypes) {
        return new DisplayCss().xs(displayType);
    }
    static sm(displayType: DisplayTypes) {
        return new DisplayCss().sm(displayType);
    }
    static lg(displayType: DisplayTypes) {
        return new DisplayCss().lg(displayType);
    }

    static xl(displayType: DisplayTypes) {
        return new DisplayCss().xl(displayType);
    }

    static xxl(displayType: DisplayTypes) {
        return new DisplayCss().xxl(displayType);
    }

    private constructor() {
        super();
    }

    private breakpoints: {
        xs?: DisplayCssForBreakpoint,
        sm?: DisplayCssForBreakpoint,
        md?: DisplayCssForBreakpoint,
        lg?: DisplayCssForBreakpoint,
        xl?: DisplayCssForBreakpoint,
        xxl?: DisplayCssForBreakpoint
    } = {};

    xs(displayType: DisplayTypes) {
        this.breakpoints.xs = new DisplayCssForBreakpoint("xs", displayType);
        return this;
    }

    sm(displayType: DisplayTypes) {
        this.breakpoints.sm = new DisplayCssForBreakpoint("sm", displayType);
        return this;
    }

    md(displayType: DisplayTypes) {
        this.breakpoints.md = new DisplayCssForBreakpoint("md", displayType);
        return this;
    }

    lg(displayType: DisplayTypes) {
        this.breakpoints.lg = new DisplayCssForBreakpoint("lg", displayType);
        return this;
    }

    xl(displayType: DisplayTypes) {
        this.breakpoints.xl = new DisplayCssForBreakpoint("xl", displayType);
        return this;
    }

    xxl(displayType: DisplayTypes) {
        this.breakpoints.xxl = new DisplayCssForBreakpoint("xxl", displayType);
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        if (this.breakpoints.xs) {
            classNames.push(this.breakpoints.xs.cssClassName());
        }
        if (this.breakpoints.sm) {
            classNames.push(this.breakpoints.sm.cssClassName());
        }
        if (this.breakpoints.md) {
            classNames.push(this.breakpoints.md.cssClassName());
        }
        if (this.breakpoints.lg) {
            classNames.push(this.breakpoints.lg.cssClassName());
        }
        if (this.breakpoints.xl) {
            classNames.push(this.breakpoints.xl.cssClassName());
        }
        if (this.breakpoints.xxl) {
            classNames.push(this.breakpoints.xxl.cssClassName());
        }
        return classNames.join(" ");
    }
}

class DisplayCssForBreakpoint {
    constructor(private readonly breakpoint: string, private readonly value: string) {
    }

    cssClassName() {
        const breakpoint = this.breakpoint === "xs" ? "" : `-${this.breakpoint}`;
        return `d${breakpoint}-${this.value}`;
    }

    toString() {
        return this.cssClassName();
    }
}