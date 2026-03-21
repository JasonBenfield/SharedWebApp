
import { CssClass } from "../CssClass";

export class OverflowCss extends CssClass {
    static remove() { return new OverflowCss("hidden").remove(); }

    static scroll() {
        return new OverflowCss("scroll");
    }

    static auto() {
        return new OverflowCss("auto");
    }

    static hidden() {
        return new OverflowCss("hidden");
    }

    static visible() {
        return new OverflowCss("visible");
    }

    private constructor(private readonly overflowType: string) {
        super();
    }

    protected buildCss() {
        return `overflow-${this.overflowType}`;
    }
}