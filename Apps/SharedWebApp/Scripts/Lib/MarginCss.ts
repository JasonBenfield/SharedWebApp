import { CssClass } from "./CssClass";

export type MarginAmount = 0 | 1 | 2 | 3 | 4 | 5 | 'auto';

export interface MarginAmounts {
    bottom?: MarginAmount;
    top?: MarginAmount;
    start?: MarginAmount;
    end?: MarginAmount;
}

export class MarginCss implements ICssBuilder {
    static bottom(amount: MarginAmount) {
        return MarginCss.xs({ bottom: amount });
    }

    static top(amount: MarginAmount) {
        return MarginCss.xs({ top: amount });
    }

    static start(amount: MarginAmount) {
        return MarginCss.xs({ start: amount });
    }

    static end(amount: MarginAmount) {
        return MarginCss.xs({ end: amount });
    }

    static xs(amounts: MarginAmounts | MarginAmount) {
        return new MarginCss().xs(amounts);
    }

    static sm(amounts: MarginAmounts | MarginAmount) {
        return new MarginCss().sm(amounts);
    }
    static md(amounts: MarginAmounts | MarginAmount) {
        return new MarginCss().md(amounts);
    }
    static lg(amounts: MarginAmounts | MarginAmount) {
        return new MarginCss().lg(amounts);
    }
    static xl(amounts: MarginAmounts | MarginAmount) {
        return new MarginCss().xl(amounts);
    }
    static xxl(amounts: MarginAmounts | MarginAmount) {
        return new MarginCss().xxl(amounts);
    }

    private readonly css = new CssClass;

    xs(amounts: MarginAmounts | MarginAmount) {
        this.addCssForBreakpoint('xs', amounts);
        return this;
    }

    sm(amounts: MarginAmounts | MarginAmount) {
        this.addCssForBreakpoint('sm', amounts);
        return this;
    }

    md(amounts: MarginAmounts | MarginAmount) {
        this.addCssForBreakpoint('md', amounts);
        return this;
    }

    lg(amounts: MarginAmounts | MarginAmount) {
        this.addCssForBreakpoint('lg', amounts);
        return this;
    }

    xl(amounts: MarginAmounts | MarginAmount) {
        this.addCssForBreakpoint('xl', amounts);
        return this;
    }

    xxl(amounts: MarginAmounts | MarginAmount) {
        this.addCssForBreakpoint('xxl', amounts);
        return this;
    }

    private addCssForBreakpoint(breakpoint: string, amounts: MarginAmounts | MarginAmount) {
        if (amounts !== null && amounts !== undefined) {
            if (this.isMarginAmount(amounts)) {
                this.css.addName(this.getCss(breakpoint, '', amounts));
            }
            else {
                this.css.addName(this.getCss(breakpoint, 'b', amounts.bottom));
                this.css.addName(this.getCss(breakpoint, 't', amounts.top));
                this.css.addName(this.getCss(breakpoint, 's', amounts.start));
                this.css.addName(this.getCss(breakpoint, 'e', amounts.end));
            }
        }
    }

    private isMarginAmount(data: any): data is MarginAmount {
        return typeof data === 'number' || data === 'auto';
    }

    private getCss(breakpoint: string, direction: string, amount: MarginAmount) {
        let css: string;
        if (amount === undefined) {
            css = '';
        }
        else {
            css = 'm';
            if (direction) {
                css += direction;
            }
            if (amount === null || amount === undefined) {
                amount = 0;
            }
            if (breakpoint && breakpoint !== 'xs') {
                css += `-${breakpoint}`;
            }
            css += `-${amount}`;
        }
        return css;
    }

    cssClass() {
        return this.css;
    }

    toString() {
        return this.css.toString();
    }
}