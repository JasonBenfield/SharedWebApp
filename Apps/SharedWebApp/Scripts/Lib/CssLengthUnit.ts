
export class CssLengthUnit {
    static em(size: number) { return new CssLengthUnit(size, 'em'); }

    static rem(size: number) { return new CssLengthUnit(size, 'rem'); }

    static px(size: number) { return new CssLengthUnit(size, 'px'); }

    static percentage(size: number) { return new CssLengthUnit(size, '%'); }

    static flex(size: number) { return new CssLengthUnit(size, 'fr'); }

    static auto() { return new CssLengthUnit(null, 'auto'); }

    static minContent() { return new CssLengthUnit(null, 'min-content'); }

    static maxContent() { return new CssLengthUnit(null, 'max-content'); }

    private readonly css: string;

    protected constructor(readonly size: number, readonly unit: string) {
        this.css = size ? `${size}${unit}` : unit;
    }

    value() { return this.css; }

    toString() { return this.value(); }
}