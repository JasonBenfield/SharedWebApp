import { CssClass } from "../CssClass";
import { ContextualClass } from "./ContextualClass";

export class BadgeCss extends CssClass {
    static remove() { return new BadgeCss().remove(); }

    private _background = ContextualClass.default;

    background(background: ContextualClass) {
        this._background = background;
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        classNames.push("badge");
        if (this._background != ContextualClass.default) {
            classNames.push(this._background.append("text-bg"));
        }
        return classNames.join(" ");
    }

}