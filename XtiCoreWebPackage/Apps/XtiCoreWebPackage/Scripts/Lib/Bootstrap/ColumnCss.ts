import { CssClass } from "../CssClass";

type ColumnCssSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "fill";

export class ColumnCssForBreakpoint {
    constructor(private readonly breakpoint: string, private readonly size: ColumnCssSize) {
    }

    cssClassName() {
        let css = "col";
        if (this.breakpoint && this.breakpoint !== "xs") {
            css += `-${this.breakpoint}`;
        }
        if (this.size === "auto") {
            css += "-auto";
        }
        else if (this.size && this.size !== "fill") {
            css += `-${this.size}`;
        }
        return css;
    }

    toString() {
        return this.cssClassName();
    }
}

export class ColumnCss extends CssClass {
    static remove() { return new ColumnCss().remove(); }

    static xs(columnSize: ColumnCssSize = "fill") {
        return new ColumnCss().xs(columnSize);
    }

    static sm(columnSize: ColumnCssSize = "fill") {
        return new ColumnCss().sm(columnSize);
    }

    static md(columnSize: ColumnCssSize = "fill") {
        return new ColumnCss().md(columnSize);
    }

    static lg(columnSize: ColumnCssSize = "fill") {
        return new ColumnCss().lg(columnSize);
    }

    static xl(columnSize: ColumnCssSize = "fill") {
        return new ColumnCss().xl(columnSize);
    }

    static xxl(columnSize: ColumnCssSize = "fill") {
        return new ColumnCss().xxl(columnSize);
    }

    private constructor() {
        super();
    }

    private breakpoints: {
        xs?: ColumnCssForBreakpoint,
        sm?: ColumnCssForBreakpoint,
        md?: ColumnCssForBreakpoint,
        lg?: ColumnCssForBreakpoint,
        xl?: ColumnCssForBreakpoint,
        xxl?: ColumnCssForBreakpoint
    } = {};

    xs(columnSize: ColumnCssSize = "fill") {
        this.breakpoints.xs = new ColumnCssForBreakpoint("xs", columnSize);
        return this;
    }

    sm(columnSize: ColumnCssSize = "fill") {
        this.breakpoints.sm = new ColumnCssForBreakpoint("sm", columnSize);
        return this;
    }

    md(columnSize: ColumnCssSize = "fill") {
        this.breakpoints.md = new ColumnCssForBreakpoint("md", columnSize);
        return this;
    }

    lg(columnSize: ColumnCssSize = "fill") {
        this.breakpoints.lg = new ColumnCssForBreakpoint("lg", columnSize);
        return this;
    }

    xl(columnSize: ColumnCssSize = "fill") {
        this.breakpoints.xl = new ColumnCssForBreakpoint("xl", columnSize);
        return this;
    }

    xxl(columnSize: ColumnCssSize = "fill") {
        this.breakpoints.xxl = new ColumnCssForBreakpoint("xxl", columnSize);
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