import { ContextualClass } from "./ContextualClass";
import { CssClass } from "./CssClass";

export class TextCss implements ICssBuilder {

    private aligns: {
        xs?: 'text-start' | 'text-end' | 'text-center'
    } = {};

    start() {
        this.aligns.xs = 'text-start';
        return this;
    }

    end() {
        this.aligns.xs = 'text-end';
        return this;
    }

    center() {
        this.aligns.xs = 'text-center';
        return this;
    }

    private _color: ContextualClass | 'text-muted' | 'text-reset';

    context(context: ContextualClass) {
        this._color = context;
        return this;
    }

    muted() {
        this._color = 'text-muted';
        return this;
    }

    resetColor() {
        this._color = 'text-reset';
        return this;
    }

    private _truncate: 'text-truncate';

    truncate() {
        this._truncate = 'text-truncate';
        return this;
    }

    private fontWeight: string;

    bold() {
        this.fontWeight = 'fw-bold';
        return this;
    }

    bolder() {
        this.fontWeight = 'fw-bolder';
        return this;
    }

    private size: string;

    fontSize(size: 1 | 2 | 3 | 4 | 5) {
        this.size = size ? `fs-${size}` : null;
    }

    private style: string;

    italicize() {
        this.style = 'fst-italic';
    }

    cssClass() {
        let css = new CssClass();
        if (this._color) {
            if (this._color instanceof ContextualClass) {
                css.addName(this._color.append('text'));
            }
            else {
                css.addName(this._color);
            }
        }
        css.addName(this.aligns.xs);
        css.addName(this._truncate);
        css.addName(this.fontWeight);
        css.addName(this.size);
        css.addName(this.style);
        return css;
    }

    toString() {
        return this.cssClass().toString();
    }
}