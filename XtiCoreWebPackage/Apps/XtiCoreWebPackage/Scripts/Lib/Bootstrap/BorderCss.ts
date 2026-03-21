import { ContextualClass } from "./ContextualClass";
import { CssClass } from "../CssClass";

export class BorderCss extends CssClass {
    static remove() { return new BorderCss().remove(); }

    static danger(isSubtle = false) {
        return new BorderCss().context(ContextualClass.danger, isSubtle);
    }

    static warning(isSubtle = false) {
        return new BorderCss().context(ContextualClass.warning, isSubtle);
    }

    static info(isSubtle = false) {
        return new BorderCss().context(ContextualClass.info, isSubtle);
    }

    static primary(isSubtle = false) {
        return new BorderCss().context(ContextualClass.primary, isSubtle);
    }

    static secondary(isSubtle = false) {
        return new BorderCss().context(ContextualClass.secondary, isSubtle);
    }

    static dark(isSubtle = false) {
        return new BorderCss().context(ContextualClass.dark, isSubtle);
    }

    static light(isSubtle = false) {
        return new BorderCss().context(ContextualClass.light, isSubtle);
    }

    private _all: BorderPartCss | undefined;
    private _top: BorderPartCss | undefined;
    private _end: BorderPartCss | undefined;
    private _bottom: BorderPartCss | undefined;
    private _start: BorderPartCss | undefined;
    private _rounded = "";
    private _roundedSize: number | undefined;

    all(configure: (part: BorderPartCss) => void) {
        if (!this._all) {
            this._all = new BorderPartCss("");
        }
        configure(this._all);
        return this;
    }

    top(configure: (part: BorderPartCss) => void) {
        if (!this._top) {
            this._top = new BorderPartCss("top");
        }
        configure(this._top);
        return this;
    }

    end(configure: (part: BorderPartCss) => void) {
        if (!this._end) {
            this._end = new BorderPartCss("end");
        }
        configure(this._end);
        return this;
    }

    bottom(configure: (part: BorderPartCss) => void) {
        if (!this._bottom) {
            this._bottom = new BorderPartCss("bottom");
        }
        configure(this._bottom);
        return this;
    }

    start(configure: (part: BorderPartCss) => void) {
        if (!this._start) {
            this._start = new BorderPartCss("start");
        }
        configure(this._start);
        return this;
    }

    private _context: ContextualClass = ContextualClass.default;
    private isSubtle = false;

    context(context: ContextualClass, isSubtle = false) {
        this._context = context;
        this.isSubtle = isSubtle;
        return this;
    }

    width(width: 0 | 1 | 2 | 3 | 4 | 5) {
        this.all(b => b.width(width));
        return this;
    }

    private _opacity = 100;

    opacity(opacity: 10 | 25 | 50 | 75 | 100) {
        this._opacity = opacity;
        return this;
    }

    rounded() {
        this._rounded = "rounded";
        return this;
    }

    roundedTop() {
        this._rounded = "rounded-top";
        return this;
    }

    roundedEnd() {
        this._rounded = "rounded-end";
        return this;
    }

    roundedBottom() {
        this._rounded = "rounded-bottom";
        return this;
    }

    roundedStart() {
        this._rounded = "rounded-start";
        return this;
    }

    roundedCircle() {
        this._rounded = "rounded-circle";
        return this;
    }

    roundedPill() {
        this._rounded = "rounded-pill";
        return this;
    }

    roundedSize(roundedSize: 1 | 2 | 3 | 4 | 5) {
        this._roundedSize = roundedSize;
        return this;
    }

    squared() {
        this._roundedSize = 0;
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        if (!this._context.equals(ContextualClass.default)) {
            classNames.push("border");
            const subtleText = this.isSubtle ? "-subtle" : "";
            const border = this._context.append("border");
            classNames.push(`${border}${subtleText}`);
        }
        const all = this._all?.toCss();
        if (all) {
            if (this._context.equals(ContextualClass.default)) {
                classNames.push("border");
            }
            classNames.push(all);
        }
        const top = this._top?.toCss();
        if (top) {
            classNames.push(top);
        }
        const end = this._end?.toCss();
        if (end) {
            classNames.push(end);
        }
        const bottom = this._bottom?.toCss();
        if (bottom) {
            classNames.push(bottom);
        }
        const start = this._start?.toCss();
        if (start) {
            classNames.push(start);
        }
        if (this._opacity < 100) {
            classNames.push(`border-opacity-${this._opacity}`);
        }
        if (this._rounded) {
            classNames.push(this._rounded);
        }
        if (this._roundedSize !== undefined) {
            classNames.push(`rounded-${this._roundedSize}`);
        }
        return classNames.join(" ");
    }
}

class BorderPartCss {
    private readonly part: string;
    private _width: number | null = 0;

    constructor(part: string) {
        this.part = part ? `border-${part}` : "border";
    }

    clearWidth() {
        this._width = null;
        return this;
    }

    width(width: 0 | 1 | 2 | 3 | 4 | 5) {
        this._width = width;
        return this;
    }

    toCss() {
        const classNames: string[] = [];
        if (this._width !== null) {
            if (this.part.indexOf("-") > -1) {
                classNames.push(this.part);
            }
            classNames.push(`${this.part}-${this._width}`);
        }
        return classNames.join(" ");
    }

    toString() {
        return this.toCss();
    }
}