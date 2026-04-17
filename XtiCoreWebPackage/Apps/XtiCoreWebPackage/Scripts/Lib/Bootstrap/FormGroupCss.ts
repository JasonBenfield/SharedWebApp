import { CssClass } from "../CssClass";

export class FormControlCss extends CssClass {
    static remove() { return new FormControlCss().remove(); }

    static text() {
        const css = new FormControlCss();
        css.type = "form-control-plaintext";
        return css;
    }

    static link() {
        const css = new FormControlCss();
        css.type = "form-control-link";
        return css;
    }

    static select() {
        const css = new FormControlCss();
        css.type = "form-select";
        return css;
    }

    static control() { return new FormControlCss(); }

    static large() { return new FormControlCss().large(); }

    static small() { return new FormControlCss().small(); }

    private type = "form-control";
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
        const cssNames: string[] = [];
        if (this.type) {
            cssNames.push(this.type);
        }
        if (this.size) {
            cssNames.push(`form-control-${this.size}`);
        }
        return cssNames.join(" ");
    }
}

export class FormLabelCss extends CssClass {
    static remove() { return new FormLabelCss().remove(); }

    protected buildCss() {
        return "col-form-label";
    }
}