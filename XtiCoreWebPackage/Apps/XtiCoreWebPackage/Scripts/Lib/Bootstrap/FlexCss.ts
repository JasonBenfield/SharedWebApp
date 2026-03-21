import { CssClass } from "../CssClass";
import { LayoutBreakpoint } from "../LayoutBreakpoint";

export class FlexCss extends CssClass {
    static remove() { return new FlexCss().remove(); }

    private readonly _direction = new FlexDirection();
    private readonly _fill = new FlexFill();
    private readonly _wrap = new FlexWrap();
    private readonly _growth = new FlexGrowth();

    direction(configure: (dir: FlexDirection) => void) {
        configure(this._direction);
        return this;
    }

    row() {
        this._direction.xs("row");
        return this;
    }

    column() {
        this._direction.xs("column");
        return this;
    }

    fill(configure: (fill: FlexFill) => void) {
        configure(this._fill);
        return this;
    }

    grow(value: FlexGrowthValues) {
        this._growth.xs(FlexGrowthCss.grow(value));
        return this;
    }

    shrink(value: FlexGrowthValues) {
        this._growth.xs(FlexGrowthCss.shrink(value));
        return this;
    }

    growth(configure: (growth: FlexGrowth) => void) {
        configure(this._growth);
        return this;
    }

    wrap(configure: (wrap: FlexWrap) => void) {
        configure(this._wrap);
        return this;
    }

    wrapReverse() {
        this._wrap.xs("wrap-reverse");
        return this;
    }

    nowrap() {
        this._wrap.xs("nowrap");
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        const direction = this._direction.getCssClass();
        if (direction) {
            classNames.push(direction);
        }
        const fill = this._fill.getCssClass();
        if (fill) {
            classNames.push(fill);
        }
        const wrap = this._wrap.getCssClass();
        if (wrap) {
            classNames.push(wrap);
        }
        const growth = this._growth.getCssClass();
        if (growth) {
            classNames.push(growth);
        }
        return classNames.join(" ");
    }
}

export class FlexFill {
    private readonly fill: {
        xs?: boolean;
        sm?: boolean;
        md?: boolean;
        lg?: boolean;
        xl?: boolean;
        xxl?: boolean;
    } = {};

    xs() {
        this.fill.xs = true;
        return this;
    }

    sm() {
        this.fill.sm = true;
        return this;
    }

    md() {
        this.fill.md = true;
        return this;
    }

    lg() {
        this.fill.lg = true;
        return this;
    }

    xl() {
        this.fill.xl = true;
        return this;
    }

    xxl() {
        this.fill.xxl = true;
        return this;
    }

    getCssClass() {
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
        let value = this.fill[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === "xs" ? "" : `-${breakpoint}`;
            return `flex${breakpointPart}-fill`;
        }
        return "";
    }
}

export type FlexDirections = "row" | "column";

export type FlexWraps = "wrap" | "nowrap" | "wrap-reverse";

export class FlexDirection {
    private readonly dir: {
        xs?: FlexDirections;
        sm?: FlexDirections;
        md?: FlexDirections;
        lg?: FlexDirections;
        xl?: FlexDirections;
        xxl?: FlexDirections;
    } = {};
    private isReversed = false;

    constructor(xs?: FlexDirections) {
        if (xs) {
            this.xs(xs);
        }
    }

    xs(value: FlexDirections) {
        this.dir.xs = value;
        return this;
    }

    sm(value: FlexDirections) {
        this.dir.sm = value;
        return this;
    }

    md(value: FlexDirections) {
        this.dir.md = value;
        return this;
    }

    lg(value: FlexDirections) {
        this.dir.lg = value;
        return this;
    }

    xl(value: FlexDirections) {
        this.dir.xl = value;
        return this;
    }

    xxl(value: FlexDirections) {
        this.dir.xxl = value;
        return this;
    }

    reverse() {
        this.isReversed = true;
        return this;
    }

    getCssClass() {
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
        let value = this.dir[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === "xs" ? "" : `-${breakpoint}`;
            let reversePart = this.isReversed ? "-reverse" : "";
            return `flex${breakpointPart}-${value}${reversePart}`;
        }
        return "";
    }
}

type FlexGrowthValues = 0 | 1;

export class FlexGrowthCss {
    static grow(value: FlexGrowthValues) {
        return new FlexGrowthCss(value, true);
    }

    static shrink(value: FlexGrowthValues) {
        return new FlexGrowthCss(value, false);
    }

    private constructor(private readonly value: FlexGrowthValues, private readonly isGrow: boolean) {
    }

    toCss(breakpoint: LayoutBreakpoint) {
        const grow = this.isGrow ? "grow" : "shrink";
        const breakpointText = breakpoint === "xs" ? "" : `-${breakpoint}`;
        return `flex-${grow}${breakpointText}-${this.value}`;
    }
}

export class FlexGrowth {
    private readonly growAndShrink: {
        xs?: FlexGrowthCss;
        sm?: FlexGrowthCss;
        md?: FlexGrowthCss;
        lg?: FlexGrowthCss;
        xl?: FlexGrowthCss;
        xxl?: FlexGrowthCss;
    } = {};

    constructor(xs?: FlexGrowthCss) {
        if (xs) {
            this.xs(xs);
        }
    }

    xs(value: FlexGrowthCss) {
        this.growAndShrink.xs = value;
        return this;
    }

    sm(value: FlexGrowthCss) {
        this.growAndShrink.sm = value;
        return this;
    }

    md(value: FlexGrowthCss) {
        this.growAndShrink.md = value;
        return this;
    }

    lg(value: FlexGrowthCss) {
        this.growAndShrink.lg = value;
        return this;
    }

    xl(value: FlexGrowthCss) {
        this.growAndShrink.xl = value;
        return this;
    }

    xxl(value: FlexGrowthCss) {
        this.growAndShrink.xxl = value;
        return this;
    }

    getCssClass() {
        const classNames: string[] = [];
        const xs = this.growAndShrink.xs?.toCss("xs");
        if (xs) {
            classNames.push(xs);
        }
        const sm = this.growAndShrink.sm?.toCss("sm");
        if (sm) {
            classNames.push(sm);
        }
        const md = this.growAndShrink.md?.toCss("md");
        if (md) {
            classNames.push(md);
        }
        const lg = this.growAndShrink.lg?.toCss("lg");
        if (lg) {
            classNames.push(lg);
        }
        const xl = this.growAndShrink.xl?.toCss("xl");
        if (xl) {
            classNames.push(xl);
        }
        const xxl = this.growAndShrink.xxl?.toCss("xxl");
        if (xxl) {
            classNames.push(xxl);
        }
        return classNames.join(" ");
    }
}

export class FlexWrap {
    private readonly wrap: {
        xs?: FlexWraps;
        sm?: FlexWraps;
        md?: FlexWraps;
        lg?: FlexWraps;
        xl?: FlexWraps;
        xxl?: FlexWraps;
    } = {};

    constructor(xs?: FlexWraps) {
        if (xs) {
            this.xs(xs);
        }
    }

    xs(value: FlexWraps) {
        this.wrap.xs = value;
        return this;
    }

    sm(value: FlexWraps) {
        this.wrap.sm = value;
        return this;
    }

    md(value: FlexWraps) {
        this.wrap.md = value;
        return this;
    }

    lg(value: FlexWraps) {
        this.wrap.lg = value;
        return this;
    }

    xl(value: FlexWraps) {
        this.wrap.xl = value;
        return this;
    }

    xxl(value: FlexWraps) {
        this.wrap.xxl = value;
        return this;
    }

    getCssClass() {
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
        let value = this.wrap[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === "xs" ? "" : `-${breakpoint}`;
            return `flex${breakpointPart}-${value}`;
        }
        return "";
    }
}
