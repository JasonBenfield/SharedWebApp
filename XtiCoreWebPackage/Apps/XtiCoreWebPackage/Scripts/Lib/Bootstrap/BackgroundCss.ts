
import { ContextualClass } from "./ContextualClass";
import { CssClass } from "../CssClass";

export class BackgroundCss extends CssClass {
    static remove() { return new BackgroundCss(ContextualClass.default).remove(); }

    static subtle(context: ContextualClass) {
        const css = new BackgroundCss(context);
        css.isSubtle = true;
        return css;
    }

    static gradient(context: ContextualClass) {
        const css = new BackgroundCss(context);
        css.isGradient = true;
        return css;
    }

    private isSubtle = false;
    private isGradient = false;
    private _opacity = 100;

    constructor(private context: ContextualClass) {
        super();
    }

    subtle() {
        this.isSubtle = true;
        return this;
    }

    gradient() {
        this.isGradient = true;
        return this;
    }

    opacity(opacity: 10 | 25 | 50 | 75) {
        this._opacity = opacity;
        return this;
    }

    protected buildCss() {
        let css = this.context.append("bg");
        if (this.isSubtle) {
            css += "-subtle";
        }
        if (this.isGradient) {
            css += " bg-gradient"; 
        }
        if (this._opacity < 100) {
            css += ` bg-opacity-${this._opacity}`;
        }
        return css;
    }
}