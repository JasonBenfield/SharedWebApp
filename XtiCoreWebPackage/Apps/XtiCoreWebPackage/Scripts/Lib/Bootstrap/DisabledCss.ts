import { CssClass } from "../CssClass";

export class DisabledCss extends CssClass {
    static remove() { return new DisabledCss().remove(); }

    protected buildCss() {
        return "disabled";
    }
}