import { CssClass } from "../CssClass";
import { LayoutBreakpoint } from "../LayoutBreakpoint";

export type ContentJustifications = "start" | "end" | "center" | "between" | "around" | "evenly";

export class JustifyContentCss extends CssClass {
    static remove() { return new JustifyContentCss().remove(); }

    static start() {
        return new JustifyContentCss("start");
    }

    static end() {
        return new JustifyContentCss("end");
    }

    static center() {
        return new JustifyContentCss("center");
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
        super();
        if (xs) {
            this.xs(xs);
        }
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

    protected buildCss() {
        const classNames: string[] = [];
        const xs = this.cssClassName("xs");
        if (xs) {
            classNames.push(xs);
        }
        const sm = this.cssClassName("sm");
        if (sm) {
            classNames.push(sm);
        }
        const md = this.cssClassName("md");
        if (md) {
            classNames.push(md);
        }
        const lg = this.cssClassName("lg");
        if (lg) {
            classNames.push(lg);
        }
        const xl = this.cssClassName("xl");
        if (xl) {
            classNames.push(xl);
        }
        const xxl = this.cssClassName("xxl");
        if (xxl) {
            classNames.push(xxl);
        }
        return classNames.join(" ");
    }

    private cssClassName(breakpoint: LayoutBreakpoint) {
        const value = this.justify[breakpoint];
        if (value) {
            const breakpointPart = breakpoint === "xs" ? "" : `-${breakpoint}`;
            return `flex${breakpointPart}-${value}`;
        }
        return "";
    }
}
