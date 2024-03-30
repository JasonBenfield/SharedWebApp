import { ContextualClass } from "./ContextualClass";
import { CssClass } from "./CssClass";

export class BorderCss {
    private _all: BorderPartCss;
    private _top: BorderPartCss;
    private _end: BorderPartCss;
    private _bottom: BorderPartCss;
    private _start: BorderPartCss;
    private _rounded: string;
    private _roundedSize: number;

    all(configure: (part: BorderPartCss) => void) {
        if (!this._all) {
            this._all = new BorderPartCss('');
        }
        configure(this._all);
        return this;
    }

    top(configure: (part: BorderPartCss) => void) {
        if (!this._top) {
            this._top = new BorderPartCss('top');
        }
        configure(this._top);
        return this;
    }

    end(configure: (part: BorderPartCss) => void) {
        if (!this._end) {
            this._end = new BorderPartCss('end');
        }
        configure(this._end);
        return this;
    }

    bottom(configure: (part: BorderPartCss) => void) {
        if (!this._bottom) {
            this._bottom = new BorderPartCss('bottom');
        }
        configure(this._bottom);
        return this;
    }

    start(configure: (part: BorderPartCss) => void) {
        if (!this._start) {
            this._start = new BorderPartCss('start');
        }
        configure(this._start);
        return this;
    }

    rounded() {
        this._rounded = 'rounded';
        return this;
    }

    roundedTop() {
        this._rounded = 'rounded-top';
        return this;
    }

    roundedEnd() {
        this._rounded = 'rounded-end';
        return this;
    }

    roundedBottom() {
        this._rounded = 'rounded-bottom';
        return this;
    }

    roundedStart() {
        this._rounded = 'rounded-start';
        return this;
    }

    roundedCircle() {
        this._rounded = 'rounded-circle';
        return this;
    }

    roundedPill() {
        this._rounded = 'rounded-pill';
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

    cssClass() {
        const cssClass = new CssClass();
        cssClass.addFrom(this._all);
        cssClass.addFrom(this._top);
        cssClass.addFrom(this._end);
        cssClass.addFrom(this._bottom);
        cssClass.addFrom(this._start);
        cssClass.addName(this._rounded);
        if (this._roundedSize !== undefined) {
            cssClass.addName(`rounded-${this._roundedSize}`);
        }
        return cssClass;
    }

    toString() {
        return this.cssClass().toString();
    }
}

export class BorderPartCss {
    private readonly part: string;
    private _context: ContextualClass;
    private _width: number;
    private _opacity: number;

    constructor(part: string) {
        this.part = part ? `border-${part}` : 'border';
    }

    context(context: ContextualClass) {
        this._context = context;
        return this;
    }

    remove() {
        this._width = 0;
        return this;
    }

    width(width: 1 | 2 | 3 | 4 | 5) {
        this._width = width;
        return this;
    }

    opacity(opacity: 10 | 25 | 50 | 75) {
        this._opacity = opacity;
        return this;
    }

    cssClass() {
        const cssClass = new CssClass();
        if (this._width !== 0) {
            cssClass.addName(this.part);
        }
        if (this._context) {
            cssClass.addName(this._context.append(this.part));
        }
        if (this._width !== undefined) {
            cssClass.addName(`${this.part}-${this._width}`);
        }
        if (this._opacity !== undefined) {
            cssClass.addName(`${this.part}-opacity-${this._opacity}`);
        }
        return cssClass;
    }

    toString() {
        return this.cssClass().toString();
    }
}