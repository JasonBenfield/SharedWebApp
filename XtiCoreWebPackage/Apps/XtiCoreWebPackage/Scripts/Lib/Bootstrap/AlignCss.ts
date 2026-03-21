import { CssClass } from "../CssClass";

type AlignType = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
type AlignContentType = "start" | "end" | "center" | "between" | "around" | "stretch";

export class AlignCssType extends CssClass {
    static remove() { return new AlignCssType("").remove(); }

    private readonly breakpoints: {
        xs?: AlignType;
        sm?: AlignType;
        md?: AlignType;
        lg?: AlignType;
        xl?: AlignType;
        xxl?: AlignType;
    } = {};

    constructor(private readonly type: string) {
        super();
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

    protected buildCss() {
        const classNames: string[] = [];
        if (this.breakpoints.xs) {
            classNames.push(this.getCssName("xs", this.breakpoints.xs));
        }
        if (this.breakpoints.sm) {
            classNames.push(this.getCssName("sm", this.breakpoints.sm));
        }
        if (this.breakpoints.md) {
            classNames.push(this.getCssName("md", this.breakpoints.md));
        }
        if (this.breakpoints.lg) {
            classNames.push(this.getCssName("lg", this.breakpoints.lg));
        }
        if (this.breakpoints.xl) {
            classNames.push(this.getCssName("xl", this.breakpoints.xl));
        }
        if (this.breakpoints.xxl) {
            classNames.push(this.getCssName("xxl", this.breakpoints.xxl));
        }
        return classNames.join(" ");
    }

    private getCssName(size?: string, alignType?: AlignType) {
        let cssName = "";
        if (size || alignType) {
            cssName = "align";
        }
        if (this.type) {
            cssName += `-${this.type}`;
        }
        if (size && size !== "xs") {
            cssName += `-${size}`;
        }
        if (alignType) {
            cssName += `-${alignType}`;
        }
        return cssName;
    }
}

export class AlignContentCssType extends CssClass {
    private readonly breakpoints: {
        xs?: AlignContentType;
        sm?: AlignContentType;
        md?: AlignContentType;
        lg?: AlignContentType;
        xl?: AlignContentType;
        xxl?: AlignContentType;
    } = {};

    constructor() {
        super();
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

    protected buildCss() {
        const classNames: string[] = [];
        if (this.breakpoints.xs) {
            classNames.push(this.getCssName("xs", this.breakpoints.xs));
        }
        if (this.breakpoints.sm) {
            classNames.push(this.getCssName("sm", this.breakpoints.sm));
        }
        if (this.breakpoints.md) {
            classNames.push(this.getCssName("md", this.breakpoints.md));
        }
        if (this.breakpoints.lg) {
            classNames.push(this.getCssName("lg", this.breakpoints.lg));
        }
        if (this.breakpoints.xl) {
            classNames.push(this.getCssName("xl", this.breakpoints.xl));
        }
        if (this.breakpoints.xxl) {
            classNames.push(this.getCssName("xxl", this.breakpoints.xxl));
        }
        return classNames.join(" ");
    }

    private getCssName(size?: string, alignType?: AlignContentType) {
        let cssName = "";
        if (size || alignType) {
            cssName = "align";
        }
        cssName += `-content`;
        if (size && size !== "xs") {
            cssName += `-${size}`;
        }
        if (alignType) {
            cssName += `-${alignType}`;
        }
        return cssName;
    }
}

export class AlignCss extends CssClass {
    private readonly types: {
        items?: AlignCssType;
        content?: AlignContentCssType;
        self?: AlignCssType;
    } = {};

    items(config: (item: AlignCssType) => void) {
        this.types.items = new AlignCssType("items");
        config(this.types.items);
        return this;
    }

    content(config: (item: AlignContentCssType) => void) {
        this.types.content = new AlignContentCssType();
        config(this.types.content);
        return this;
    }

    self(config: (item: AlignCssType) => void) {
        this.types.self = new AlignCssType("self");
        config(this.types.self);
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        if (this.types.items) {
            classNames.push(this.types.items.toCss());
        }
        if (this.types.content) {
            classNames.push(this.types.content.toCss());
        }
        if (this.types.self) {
            classNames.push(this.types.self.toCss());
        }
        return classNames.join(" ");
    }
}