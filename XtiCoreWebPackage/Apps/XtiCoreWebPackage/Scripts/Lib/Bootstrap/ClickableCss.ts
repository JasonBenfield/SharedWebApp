import { CssClass } from "../CssClass";

export class ClickableCss extends CssClass {
    static remove() { return new ClickableCss().remove(); }

    protected buildCss() {
        return "clickable";
    }
}