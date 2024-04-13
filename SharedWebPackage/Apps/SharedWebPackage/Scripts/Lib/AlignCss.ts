import { CssClass } from "./CssClass";

type AlignType = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
type AlignContentType = 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch';

export class AlignCssType implements ICssBuilder {
    private readonly breakpoints: {
        xs?: AlignType;
        sm?: AlignType;
        md?: AlignType;
        lg?: AlignType;
        xl?: AlignType;
        xxl?: AlignType;
    } = {};

    constructor(private readonly type: string) {
    }

    xs(alignType: AlignType) {
        this.breakpoints.xs = alignType;
    }

    sm(alignType: AlignType) {
        this.breakpoints.sm = alignType;
    }

    md(alignType: AlignType) {
        this.breakpoints.md = alignType;
    }

    lg(alignType: AlignType) {
        this.breakpoints.lg = alignType;
    }

    xl(alignType: AlignType) {
        this.breakpoints.xl = alignType;
    }

    xxl(alignType: AlignType) {
        this.breakpoints.xxl = alignType;
    }

    cssClass() {
        let css = new CssClass();
        css.addName(this.breakpoints.xs && this.getCssName('xs', this.breakpoints.xs));
        css.addName(this.breakpoints.sm && this.getCssName('sm', this.breakpoints.sm));
        css.addName(this.breakpoints.md && this.getCssName('md', this.breakpoints.md));
        css.addName(this.breakpoints.lg && this.getCssName('lg', this.breakpoints.lg));
        css.addName(this.breakpoints.xl && this.getCssName('xl', this.breakpoints.xl));
        css.addName(this.breakpoints.xxl && this.getCssName('xxl', this.breakpoints.xxl));
        return css;
    }

    private getCssName(size?: string, alignType?: AlignType) {
        let cssName = '';
        if (size || alignType) {
            cssName = 'align';
        }
        if (this.type) {
            cssName += `-${this.type}`;
        }
        if (size && size !== 'xs') {
            cssName += `-${size}`;
        }
        if (alignType) {
            cssName += `-${alignType}`;
        }
        return cssName;
    }

    toString() {
        return this.cssClass().toString();
    }
}

export class AlignContentCssType implements ICssBuilder {
    private readonly breakpoints: {
        xs?: AlignContentType;
        sm?: AlignContentType;
        md?: AlignContentType;
        lg?: AlignContentType;
        xl?: AlignContentType;
        xxl?: AlignContentType;
    } = {};

    constructor() {
    }

    xs(alignType: AlignContentType) {
        this.breakpoints.xs = alignType;
    }

    sm(alignType: AlignContentType) {
        this.breakpoints.sm = alignType;
    }

    md(alignType: AlignContentType) {
        this.breakpoints.md = alignType;
    }

    lg(alignType: AlignContentType) {
        this.breakpoints.lg = alignType;
    }

    xl(alignType: AlignContentType) {
        this.breakpoints.xl = alignType;
    }

    xxl(alignType: AlignContentType) {
        this.breakpoints.xxl = alignType;
    }

    cssClass() {
        let css = new CssClass();
        css.addName(this.breakpoints.xs && this.getCssName('xs', this.breakpoints.xs));
        css.addName(this.breakpoints.sm && this.getCssName('sm', this.breakpoints.sm));
        css.addName(this.breakpoints.md && this.getCssName('md', this.breakpoints.md));
        css.addName(this.breakpoints.lg && this.getCssName('lg', this.breakpoints.lg));
        css.addName(this.breakpoints.xl && this.getCssName('xl', this.breakpoints.xl));
        css.addName(this.breakpoints.xxl && this.getCssName('xxl', this.breakpoints.xxl));
        return css;
    }

    private getCssName(size?: string, alignType?: AlignContentType) {
        let cssName = '';
        if (size || alignType) {
            cssName = 'align';
        }
        cssName += `-content`;
        if (size && size !== 'xs') {
            cssName += `-${size}`;
        }
        if (alignType) {
            cssName += `-${alignType}`;
        }
        return cssName;
    }

    toString() {
        return this.cssClass().toString();
    }
}

export class AlignCss implements ICssBuilder {
    private readonly types: {
        items?: AlignCssType;
        content?: AlignContentCssType;
        self?: AlignCssType;
    } = {};

    items(config: (item: AlignCssType) => void) {
        this.types.items = new AlignCssType('items');
        config(this.types.items);
        return this;
    }

    content(config: (item: AlignContentCssType) => void) {
        this.types.content = new AlignContentCssType();
        config(this.types.content);
        return this;
    }

    self(config: (item: AlignCssType) => void) {
        this.types.self = new AlignCssType('self');
        config(this.types.self);
        return this;
    }

    cssClass() {
        let css = new CssClass();
        css.addFrom(this.types.items && this.types.items.cssClass());
        css.addFrom(this.types.content && this.types.content.cssClass());
        css.addFrom(this.types.self && this.types.self.cssClass());
        return css;
    }

    toString() {
        return this.cssClass().toString();
    }
}