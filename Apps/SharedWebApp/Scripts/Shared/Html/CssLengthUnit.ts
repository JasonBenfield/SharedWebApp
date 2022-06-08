
export class CssLengthUnit {
    static em(size: number) { return new CssLengthUnit(size, 'em'); }

    static rem(size: number) { return new CssLengthUnit(size, 'rem'); }

    static px(size: number) { return new CssLengthUnit(size, 'px'); }

    static percentage(size: number) { return new CssLengthUnit(size, '%'); }

    static flex(size: number) { return new CssLengthUnit(size, 'fr'); }

    static auto() { return new CssLengthUnit(null, 'auto'); }

    private readonly css: string;

    protected constructor(size: number, unit: string) {
        this.css = `${size}${unit}`;
    }

    value() { return this.css; }

    toString() { return this.value(); }
}