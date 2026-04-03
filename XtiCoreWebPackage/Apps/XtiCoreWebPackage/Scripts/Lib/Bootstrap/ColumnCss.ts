import { CssClass } from "../CssClass";
import { Breakpoints } from "./Breakpoints";

type ColumnCssSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto" | "fill";

class ColumnCssForBreakpoint {
    constructor(private readonly breakpoint: Breakpoints, private readonly size: ColumnCssSize) {
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
        return this.setBreakpoint("xs", columnSize);
    }

    sm(columnSize: ColumnCssSize = "fill") {
        return this.setBreakpoint("sm", columnSize);
    }

    md(columnSize: ColumnCssSize = "fill") {
        return this.setBreakpoint("md", columnSize);
    }

    lg(columnSize: ColumnCssSize = "fill") {
        return this.setBreakpoint("lg", columnSize);
    }

    xl(columnSize: ColumnCssSize = "fill") {
        return this.setBreakpoint("xl", columnSize);
    }

    xxl(columnSize: ColumnCssSize = "fill") {
        return this.setBreakpoint("xxl", columnSize);
    }

    private setBreakpoint(breakpoint: Breakpoints, columnSize: ColumnCssSize) {
        const columnBreakpoint = new ColumnCssForBreakpoint(breakpoint, columnSize);
        Reflect.set(this.breakpoints, breakpoint, columnBreakpoint);
        return this;

    }

    protected buildCss() {
        const classNames: string[] = [];
        for (const key in this.breakpoints) {
            const breakpoint: ColumnCssForBreakpoint = Reflect.get(this.breakpoints, key);
            if (breakpoint) {
                classNames.push(breakpoint.cssClassName());
            }
        }
        return classNames.join(" ");
    }
}