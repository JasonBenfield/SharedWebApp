import { CssClass } from "../CssClass";

export class VisibilityCss extends CssClass {
    static remove() { return new VisibilityCss().remove(); }

    private isVisible = true;

    makeVisible() {
        this.isVisible = true;
        return this;
    }

    makeInvisible() {
        this.isVisible = false;
        return this;
    }

    protected buildCss() {
        return this.isVisible ? "visible" : "invisible";
    }
}