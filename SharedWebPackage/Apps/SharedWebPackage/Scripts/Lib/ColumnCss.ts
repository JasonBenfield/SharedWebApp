import { CssClass } from "./CssClass";

export class ColumnCssForBreakpoint {
    constructor(private readonly breakpoint: string, private readonly size: ColumnCssSize) {
    }

    cssClassName() {
        let css = 'col';
        if (this.breakpoint && this.breakpoint !== 'xs') {
            css += `-${this.breakpoint}`;
        }
        if (this.size === 'auto') {
            css += '-auto';
        }
        else if (this.size && this.size !== 'fill') {
            css += `-${this.size}`;
        }
        return css;
    }

    toString() {
        return this.cssClassName();
    }
}

export class ColumnCss implements IColumnCss, ICssBuilder {
    static xs(columnSize: ColumnCssSize = 'fill') {
        return new ColumnCss().xs(columnSize);
    }
    static sm(columnSize: ColumnCssSize = 'fill') {
        return new ColumnCss().sm(columnSize);
    }
    static lg(columnSize: ColumnCssSize = 'fill') {
        return new ColumnCss().lg(columnSize);
    }

    static xl(columnSize: ColumnCssSize = 'fill') {
        return new ColumnCss().xl(columnSize);
    }

    static xxl(columnSize: ColumnCssSize = 'fill') {
        return new ColumnCss().xxl(columnSize);
    }

    private constructor() {
    }

    private breakpoints: {
        xs?: ColumnCssForBreakpoint,
        sm?: ColumnCssForBreakpoint,
        md?: ColumnCssForBreakpoint,
        lg?: ColumnCssForBreakpoint,
        xl?: ColumnCssForBreakpoint,
        xxl?: ColumnCssForBreakpoint
    } = {};

    xs(columnSize: ColumnCssSize = 'fill') {
        this.breakpoints.xs = new ColumnCssForBreakpoint('xs', columnSize);
        return this;
    }

    sm(columnSize: ColumnCssSize = 'fill') {
        this.breakpoints.sm = new ColumnCssForBreakpoint('sm', columnSize);
        return this;
    }

    md(columnSize: ColumnCssSize = 'fill') {
        this.breakpoints.md = new ColumnCssForBreakpoint('md', columnSize);
        return this;
    }

    lg(columnSize: ColumnCssSize = 'fill') {
        this.breakpoints.lg = new ColumnCssForBreakpoint('lg', columnSize);
        return this;
    }

    xl(columnSize: ColumnCssSize = 'fill') {
        this.breakpoints.xl = new ColumnCssForBreakpoint('xl', columnSize);
        return this;
    }

    xxl(columnSize: ColumnCssSize = 'fill') {
        this.breakpoints.xxl = new ColumnCssForBreakpoint('xxl', columnSize);
        return this;
    }

    cssClass() {
        let css = new CssClass();
        css.addName(this.breakpoints.xs && this.breakpoints.xs.cssClassName());
        css.addName(this.breakpoints.sm && this.breakpoints.sm.cssClassName());
        css.addName(this.breakpoints.md && this.breakpoints.md.cssClassName());
        css.addName(this.breakpoints.lg && this.breakpoints.lg.cssClassName());
        css.addName(this.breakpoints.xl && this.breakpoints.xl.cssClassName());
        css.addName(this.breakpoints.xxl && this.breakpoints.xxl.cssClassName());
        return css;
    }

    toString() {
        return this.cssClass().toString();
    }
}