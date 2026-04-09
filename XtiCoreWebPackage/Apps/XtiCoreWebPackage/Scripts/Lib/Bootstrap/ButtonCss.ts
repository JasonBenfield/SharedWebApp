import { CssClass } from "../CssClass";
import { ContextualClass } from "./ContextualClass";

export class ButtonCss extends CssClass {
    static remove() {
        return new ButtonCss().remove();
    }

    static outline(context = ContextualClass.default) {
        return new ButtonCss().outline().context(context);
    }

    static solid(context = ContextualClass.default) {
        return new ButtonCss().solid().context(context);
    }

    static link() {
        return new ButtonCss().link();
    }

    private _context = ContextualClass.default;
    private isOutline = false;
    private isLink = false;
    private size = "";

    context(context: ContextualClass) {
        this._context = context;
        return this;
    }

    outline() {
        this.isOutline = true;
        return this;
    }

    solid() {
        this.isOutline = false;
        return this;
    }

    private link() {
        this.isLink = true;
        return this;
    }

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
        const classNames: string[] = [];
        classNames.push("btn");
        if (this.isLink) {
            classNames.push("btn-link");
        }
        else if (this._context !== ContextualClass.default) {
            classNames.push(this._context.append(this.isOutline ? "btn-outline" : "btn"));
        }
        if (this.size) {
            classNames.push(`btn-${this.size}`);
        }
        return classNames.join(" ");
    }
}