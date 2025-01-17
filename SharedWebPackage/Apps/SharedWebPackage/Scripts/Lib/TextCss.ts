import { ContextualClass } from "./ContextualClass";
import { CssClass } from "./CssClass";

export class TextCss implements ICssBuilder {

    private aligns: {
        xs?: "text-start" | "text-end" | "text-center"
    } = {};

    start() {
        this.aligns.xs = "text-start";
        return this;
    }

    end() {
        this.aligns.xs = "text-end";
        return this;
    }

    center() {
        this.aligns.xs = "text-center";
        return this;
    }

    private _color: ContextualClass | "text-muted" | "text-reset";

    context(context: ContextualClass) {
        this._color = context;
        return this;
    }

    muted() {
        this._color = "text-muted";
        return this;
    }

    resetColor() {
        this._color = "text-reset";
        return this;
    }

    private _truncate: "text-truncate";

    truncate() {
        this._truncate = "text-truncate";
        return this;
    }

    private fontWeight: string;

    bold() {
        this.fontWeight = "fw-bold";
        return this;
    }

    bolder() {
        this.fontWeight = "fw-bolder";
        return this;
    }

    normalWeight() {
        this.fontWeight = "fa-normal";
        return this;
    }

    private size: string;

    fontSize(size: 1 | 2 | 3 | 4 | 5) {
        this.size = size ? `fs-${size}` : null;
        return this;
    }

    private _wrap: string;

    wrap() {
        this._wrap = "text-wrap";
        return this;
    }

    nowrap() {
        this._wrap = "text-nowrap";
        return this;
    }

    private style: string;

    italicize() {
        this.style = "fst-italic";
        return this;
    }

    private textDecoration: string;

    underline() {
        this.textDecoration = "text-decoration-underline";
        return this;
    }

    lineThrough() {
        this.textDecoration = "text-decoration-line-through";
        return this;
    }

    noTextDecoration() {
        this.textDecoration = "text-decoration-none";
        return this;
    }

    private _textBreak: string;

    textBreak() {
        this._textBreak = "text-break";
        return this;
    }

    private _monospace: string;

    monospace() {
        this._monospace = "font-monospace";
        return this;
    }

    cssClass() {
        const css = new CssClass();
        if (this._color) {
            if (this._color instanceof ContextualClass) {
                css.addName(this._color.append("text"));
            }
            else {
                css.addName(this._color);
            }
        }
        if (this.aligns.xs) {
            css.addName(this.aligns.xs);
        }
        if (this._truncate) {
            css.addName(this._truncate);
        }
        if (this.fontWeight) {
            css.addName(this.fontWeight);
        }
        if (this.size) {
            css.addName(this.size);
        }
        if (this._wrap) {
            css.addName(this._wrap);
        }
        if (this.style) {
            css.addName(this.style);
        }
        if (this.textDecoration) {
            css.addName(this.textDecoration);
        }
        if (this._textBreak) {
            css.addName(this._textBreak);
        }
        if (this._monospace) {
            css.addName(this._monospace);
        }
        return css;
    }

    toString() {
        return this.cssClass().toString();
    }
}