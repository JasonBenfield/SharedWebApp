import { CssClass } from "./CssClass";

export class FlexCss implements ICssBuilder {
    private readonly _direction = new FlexDirection();
    private readonly _fill = new FlexFill();
    private readonly _wrap = new FlexWrap();

    direction(configure: (dir: FlexDirection) => void) {
        configure(this._direction);
    }

    row() {
        this._direction.xs('row');
        return this;
    }

    column() {
        this._direction.xs('column');
        return this;
    }

    fill(configure?: (fill: FlexFill) => void) {
        if (configure) {
            configure(this._fill);
        }
        else {
            this._fill.xs();
        }
        return this;
    }

    wrap(configure?: (wrap: FlexWrap) => void) {
        if (configure) {
            configure(this._wrap);
        }
        else {
            this._wrap.xs('wrap');
        }
        return this;
    }

    wrapReverse() {
        this._wrap.xs('wrap-reverse');
        return this;
    }

    nowrap() {
        this._wrap.xs('nowrap');
        return this;
    }

    cssClass() {
        const cssClass = new CssClass();
        cssClass.addFrom(this._direction.getCssClass());
        cssClass.addFrom(this._fill.getCssClass());
        cssClass.addFrom(this._wrap.getCssClass());
        return cssClass;
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
        const cssClass = new CssClass();
        cssClass.addName(this.cssClassName('xs'));
        cssClass.addName(this.cssClassName('sm'));
        cssClass.addName(this.cssClassName('md'));
        cssClass.addName(this.cssClassName('lg'));
        cssClass.addName(this.cssClassName('xl'));
        cssClass.addName(this.cssClassName('xxl'));
        return cssClass;
    }

    private cssClassName(breakpoint: LayoutBreakpoint) {
        let value = this.fill[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === 'xs' ? '' : `-${breakpoint}`;
            return `flex${breakpointPart}-fill`;
        }
        return '';
    }
}

export class FlexDirection {
    private readonly dir: {
        xs?: FlexDirections;
        sm?: FlexDirections;
        md?: FlexDirections;
        lg?: FlexDirections;
        xl?: FlexDirections;
        xxl?: FlexDirections;
    } = {};
    private isReversed: boolean;

    constructor(xs?: FlexDirections) {
        this.xs(xs);
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
        let value = this.dir[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === 'xs' ? '' : `-${breakpoint}`;
            let reversePart = this.isReversed ? '-reverse' : '';
            return `flex${breakpointPart}-${value}${reversePart}`;
        }
        return '';
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
        this.xs(xs);
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
        let value = this.wrap[breakpoint];
        if (value) {
            let breakpointPart = breakpoint === 'xs' ? '' : `-${breakpoint}`;
            return `flex${breakpointPart}-${value}`;
        }
        return '';
    }
}
