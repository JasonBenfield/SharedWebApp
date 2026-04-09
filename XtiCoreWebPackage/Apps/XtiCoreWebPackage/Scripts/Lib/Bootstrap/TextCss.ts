import { ContextualClass } from "./ContextualClass";
import { CssClass } from "../CssClass";

export class TextCss extends CssClass {
    static remove() { return new TextCss().remove(); }

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

    private _color: ContextualClass | string = "";

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

    private _truncate = "";

    truncate() {
        this._truncate = "text-truncate";
        return this;
    }

    private fontWeight = "";

    bold() {
        this.fontWeight = "fw-bold";
        return this;
    }

    semibold() {
        this.fontWeight = "fw-semibold";
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

    private size = "";

    fontSize(size: 1 | 2 | 3 | 4 | 5) {
        this.size = size ? `fs-${size}` : "";
        return this;
    }

    private _wrap = "";

    wrap() {
        this._wrap = "text-wrap";
        return this;
    }

    nowrap() {
        this._wrap = "text-nowrap";
        return this;
    }

    private style = "";

    italicize() {
        this.style = "fst-italic";
        return this;
    }

    normalStyle() {
        this.style = "fst-normal";
        return this;
    }

    private textDecoration = "";

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

    private _textBreak = "";

    textBreak() {
        this._textBreak = "text-break";
        return this;
    }

    private _monospace = "";

    monospace() {
        this._monospace = "font-monospace";
        return this;
    }

    private _textSelection = "";

    selectAll() {
        this._textSelection = "user-select-all";
    }

    selectNone() {
        this._textSelection = "user-select-none";
    }

    private _lineHeight = "";

    lineHeight(lineHeight: "1" | "sm" | "base" | "lg") {
        this._lineHeight = lineHeight;
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        if (this._color) {
            if (this._color instanceof ContextualClass) {
                classNames.push(this._color.append("text"));
            }
            else {
                classNames.push(this._color);
            }
        }
        if (this.aligns.xs) {
            classNames.push(this.aligns.xs);
        }
        if (this._truncate) {
            classNames.push(this._truncate);
        }
        if (this.fontWeight) {
            classNames.push(this.fontWeight);
        }
        if (this.size) {
            classNames.push(this.size);
        }
        if (this._wrap) {
            classNames.push(this._wrap);
        }
        if (this.style) {
            classNames.push(this.style);
        }
        if (this.textDecoration) {
            classNames.push(this.textDecoration);
        }
        if (this._textBreak) {
            classNames.push(this._textBreak);
        }
        if (this._monospace) {
            classNames.push(this._monospace);
        }
        if (this._textSelection) {
            classNames.push(this._textSelection);
        }
        if (this._lineHeight) {
            classNames.push(`lh-${this._lineHeight}`);
        }
        return classNames.join(" ");
    }
}