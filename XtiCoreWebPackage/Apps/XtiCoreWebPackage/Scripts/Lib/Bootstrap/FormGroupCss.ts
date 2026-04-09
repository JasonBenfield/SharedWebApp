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

    static large() { return new FormControlCss().large(); }

    static small() { return new FormControlCss().small(); }

    private type = "";
    private size = "";

    large() {
        this.size = "lg";
        return this;
    }

    small() {
        this.size = "sm";
        return this;
    }

    normalSize() {
        this.size = "";
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