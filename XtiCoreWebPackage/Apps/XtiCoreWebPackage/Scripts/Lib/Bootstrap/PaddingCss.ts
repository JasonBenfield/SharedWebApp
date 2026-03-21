import { CssClass } from "../CssClass";

export type PaddingAmount = 0 | 1 | 2 | 3 | 4 | 5 | "auto";

export interface PaddingAmounts {
    bottom?: PaddingAmount;
    top?: PaddingAmount;
    start?: PaddingAmount;
    end?: PaddingAmount;
}

export class PaddingCss extends CssClass {
    static remove() { return new PaddingCss().remove(); }

    static bottom(amount: PaddingAmount) {
        return PaddingCss.xs({ bottom: amount });
    }

    static top(amount: PaddingAmount) {
        return PaddingCss.xs({ top: amount });
    }

    static start(amount: PaddingAmount) {
        return PaddingCss.xs({ start: amount });
    }

    static end(amount: PaddingAmount) {
        return PaddingCss.xs({ end: amount });
    }

    static xs(amounts: PaddingAmounts | PaddingAmount) {
        return new PaddingCss().xs(amounts);
    }

    static sm(amounts: PaddingAmounts | PaddingAmount) {
        return new PaddingCss().sm(amounts);
    }
    static md(amounts: PaddingAmounts | PaddingAmount) {
        return new PaddingCss().md(amounts);
    }
    static lg(amounts: PaddingAmounts | PaddingAmount) {
        return new PaddingCss().lg(amounts);
    }
    static xl(amounts: PaddingAmounts | PaddingAmount) {
        return new PaddingCss().xl(amounts);
    }
    static xxl(amounts: PaddingAmounts | PaddingAmount) {
        return new PaddingCss().xxl(amounts);
    }

    private readonly classNames: string[] = [];

    xs(amounts: PaddingAmounts | PaddingAmount) {
        this.addCssForBreakpoint("xs", amounts);
        return this;
    }

    sm(amounts: PaddingAmounts | PaddingAmount) {
        this.addCssForBreakpoint("sm", amounts);
        return this;
    }

    md(amounts: PaddingAmounts | PaddingAmount) {
        this.addCssForBreakpoint("md", amounts);
        return this;
    }

    lg(amounts: PaddingAmounts | PaddingAmount) {
        this.addCssForBreakpoint("lg", amounts);
        return this;
    }

    xl(amounts: PaddingAmounts | PaddingAmount) {
        this.addCssForBreakpoint("xl", amounts);
        return this;
    }

    xxl(amounts: PaddingAmounts | PaddingAmount) {
        this.addCssForBreakpoint("xxl", amounts);
        return this;
    }

    private addCssForBreakpoint(breakpoint: string, amounts: PaddingAmounts | PaddingAmount) {
        if (this.isPaddingAmount(amounts)) {
            this.classNames.push(this.getCss(breakpoint, "", amounts));
        }
        else {
            this.classNames.push(this.getCss(breakpoint, "b", amounts.bottom));
            this.classNames.push(this.getCss(breakpoint, "t", amounts.top));
            this.classNames.push(this.getCss(breakpoint, "s", amounts.start));
            this.classNames.push(this.getCss(breakpoint, "e", amounts.end));
        }
    }

    private isPaddingAmount(data: any): data is PaddingAmount {
        return typeof data === "number" || data === "auto";
    }

    private getCss(breakpoint: string, direction: string, amount?: PaddingAmount) {
        let css: string;
        if (amount === undefined || amount == null) {
            css = "";
        }
        else {
            css = "p";
            if (direction) {
                css += direction;
            }
            if (breakpoint && breakpoint !== "xs") {
                css += `-${breakpoint}`;
            }
            css += `-${amount}`;
        }
        return css;
    }

    protected buildCss() {
        return this.classNames.filter(cn => Boolean(cn)).join(" ");
    }
}