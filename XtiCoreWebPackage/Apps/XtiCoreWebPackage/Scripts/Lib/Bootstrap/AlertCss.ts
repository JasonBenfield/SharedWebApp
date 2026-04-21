import { CssClass } from "../CssClass";
import { ContextualClass } from "./ContextualClass";

export class AlertCss extends CssClass {

    static remove() { return new AlertCss().remove(); }

    static dismissible() {
        const css = new AlertCss();
        css.isDismissible = true;
        return css;
    }

    static primary() { return new AlertCss().primary(); }

    static secondary() { return new AlertCss().secondary(); }

    static danger() { return new AlertCss().danger(); }

    static warning() { return new AlertCss().warning(); }

    static info() { return new AlertCss().info(); }

    static success() { return new AlertCss().success(); }

    static dark() { return new AlertCss().dark(); }

    static light() { return new AlertCss().light(); }

    private _context = ContextualClass.default;
    private isDismissible = false;

    primary() { return this.context(ContextualClass.primary); }

    secondary() { return this.context(ContextualClass.secondary); }

    danger() { return this.context(ContextualClass.danger); }

    warning() { return this.context(ContextualClass.warning); }

    info() { return this.context(ContextualClass.info); }

    success() { return this.context(ContextualClass.success); }

    dark() { return this.context(ContextualClass.dark); }

    light() { return this.context(ContextualClass.light); }

    context(context: ContextualClass) {
        this._context = context;
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        classNames.push("alert");
        if (this._context !== ContextualClass.default) {
            classNames.push(this._context.append("alert-"));
        }
        if (this.isDismissible) {
            classNames.push("alert-dismissible");
        }
        return classNames.join(" ");
    }

}

export class AlertLinkCss extends CssClass {

    static remove() { return new AlertLinkCss().remove(); }

    protected buildCss() {
        return "alert-link";
    }
}

export class AlertHeadingCss extends CssClass {

    static remove() { return new AlertHeadingCss().remove(); }

    protected buildCss() {
        return "alert-heading";
    }
}