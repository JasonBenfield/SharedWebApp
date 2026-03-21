
import { CssClass } from "../CssClass";

export class WidthCss extends CssClass {
    static remove() { return new WidthCss("auto").remove(); }

    static fill() {
        return new WidthCss(100);
    }

    static relativeToViewport(percentage: "auto" | 25 | 50 | 75 | 100) {
        const css = new WidthCss(percentage);
        css.isRelativeToViewport = true;
        return css;
    }

    constructor(private readonly percentage: "auto" | 25 | 50 | 75 | 100) {
        super();
    }

    private isRelativeToViewport = false;

    protected buildCss() {
        const viewport = this.isRelativeToViewport ? "v" : "";
        return `${viewport}w-${this.percentage}`;
    }
}