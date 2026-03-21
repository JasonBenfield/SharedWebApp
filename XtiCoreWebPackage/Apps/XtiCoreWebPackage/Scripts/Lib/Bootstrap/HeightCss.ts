
import { CssClass } from "../CssClass";

export class HeightCss extends CssClass {
    static remove() { return new HeightCss("auto").remove(); }

    static fill() {
        return new HeightCss(100);
    }

    static fillViewport() {
        return HeightCss.relativeToViewport(100);
    }

    static relativeToViewport(percentage: "auto" | 25 | 50 | 75 | 100) {
        const css = new HeightCss(percentage);
        css.isRelativeToViewport = true;
        return css;
    }

    constructor(private readonly percentage: "auto" | 25 | 50 | 75 | 100) {
        super();
    }

    private isRelativeToViewport = false;

    protected buildCss() {
        const viewport = this.isRelativeToViewport ? "v" : "";
        return `${viewport}h-${this.percentage}`;
    }
}