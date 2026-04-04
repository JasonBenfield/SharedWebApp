import { CssClass } from "../CssClass";

export class FormControlCss extends CssClass {
    static remove() { return new FormControlCss().remove(); }

    static text() {
        const css = new FormControlCss();
        css.type = "text";
        return css;
    }

    static link() {
        const css = new FormControlCss();
        css.type = "link";
        return css;
    }

    static control() { return new FormControlCss(); }

    static makeLarge() { return new FormControlCss().makeLarge(); }

    static makeSmall() { return new FormControlCss().makeSmall(); }

    private type = "";
    private size = "";

    makeLarge() {
        this.size = "lg";
        return this;
    }

    makeSmall() {
        this.size = "sm";
        return this;
    }

    protected buildCss() {
        let css: string;
        if (this.type) {
            css = `form-control-${this.type}`;
        }
        else {
            css = this.size ? `form-control-${this.size}` : "form-control";
        }
        return css;
    }
}

export class FormLabelCss extends CssClass {
    static remove() { return new FormLabelCss().remove(); }

    protected buildCss() {
        return "col-form-label";
    }
}