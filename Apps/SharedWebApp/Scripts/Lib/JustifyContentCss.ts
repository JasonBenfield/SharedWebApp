import { CssClass } from "./CssClass";

export class JustifyContentCss implements ICssBuilder {
    static start() {
        return new JustifyContentCss('start');
    }

    static end() {
        return new JustifyContentCss('end');
    }

    static center() {
        return new JustifyContentCss('center');
    }

    private readonly justify: {
        xs?: ContentJustifications;
        sm?: ContentJustifications;
        md?: ContentJustifications;
        lg?: ContentJustifications;
        xl?: ContentJustifications;
        xxl?: ContentJustifications;
    } = {};

    constructor(xs?: ContentJustifications) {
        this.xs(xs);
    }

    xs(value: ContentJustifications) {
        this.justify.xs = value;
        return this;
    }

    sm(value: ContentJustifications) {
        this.justify.sm = value;
        return this;
    }

    md(value: ContentJustifications) {
        this.justify.md = value;
        return this;
    }

    lg(value: ContentJustifications) {
        this.justify.lg = value;
        return this;
    }

    xl(value: ContentJustifications) {
        this.justify.xl = value;
        return this;
    }

    xxl(value: ContentJustifications) {
        this.justify.xxl = value;
        return this;
    }

    cssClass() {
        let cssClass = new CssClass();
        cssClass.addName(this.cssClassName('xs'));
        cssClass.addName(this.cssClassName('sm'));
        cssClass.addName(this.cssClassName('md'));
        cssClass.addName(this.cssClassName('lg'));
        cssClass.addName(this.cssClassName('xl'));
        cssClass.addName(this.cssClassName('xxl'));
        return cssClass;
    }

    private cssClassName(breakpoint: LayoutBreakpoint) {
        let value = this.justify[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === 'xs' ? '' : `-${breakpoint}`;
            return `flex${breakpointPart}-${value}`;
        }
        return '';
    }
}
