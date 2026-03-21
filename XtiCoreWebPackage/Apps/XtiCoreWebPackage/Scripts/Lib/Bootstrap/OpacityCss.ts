
import { CssClass } from "../CssClass";

export class OpacityCss extends CssClass {
    static remove() { return new OpacityCss(100).remove(); }

    private constructor(private readonly percentage: 0 | 25 | 50 | 75 | 100) {
        super();
    }

    protected buildCss() {
        return `opacity-${this.percentage}`;
    }
}