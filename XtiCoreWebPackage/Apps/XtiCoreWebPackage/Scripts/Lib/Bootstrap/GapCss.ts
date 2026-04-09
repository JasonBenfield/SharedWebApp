import { CssClass } from "../CssClass";

export class GapCss extends CssClass {
    static remove() { return new GapCss(0).remove(); }
    constructor(private spacer: 0 | 1 | 2 | 3 | 4 | 5) {
        super();
    }

    protected buildCss() {
        return `gap-${this.spacer}`;
    }
}

export class RowGapCss extends CssClass {
    static remove() { return new RowGapCss(0).remove(); }
    constructor(private spacer: 0 | 1 | 2 | 3 | 4 | 5) {
        super();
    }

    protected buildCss() {
        return `row-gap-${this.spacer}`;
    }
}

export class ColumnGapCss extends CssClass {
    static remove() { return new ColumnGapCss(0).remove(); }
    constructor(private spacer: 0 | 1 | 2 | 3 | 4 | 5) {
        super();
    }

    protected buildCss() {
        return `col-gap-${this.spacer}`;
    }
}