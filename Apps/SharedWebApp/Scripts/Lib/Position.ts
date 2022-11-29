
export class PositionUnit {
    static em(size: number) { return new PositionUnit(size, 'em'); }

    static rem(size: number) { return new PositionUnit(size, 'rem'); }

    static px(size: number) { return new PositionUnit(size, 'px'); }

    static percentage(size: number) { return new PositionUnit(size, '%'); }

    private readonly css: string;

    protected constructor(readonly size: number, readonly unit: string) {
        this.css = size ? `${size}${unit}` : '0';
    }

    value() { return this.css; }

    toString() { return this.value(); }
}

export class Position {
    static fill() {
        return new Position({
            top: PositionUnit.px(0),
            right: PositionUnit.px(0),
            bottom: PositionUnit.px(0),
            left: PositionUnit.px(0)
        });
    }

    constructor(value?: { top?: PositionUnit, right?: PositionUnit, bottom?: PositionUnit, left?: PositionUnit }) {
        this.top = value && value.top;
        this.right = value && value.right;
        this.bottom = value && value.bottom;
        this.left = value && value.left;
    }

    readonly top?: PositionUnit;
    readonly right?: PositionUnit;
    readonly bottom?: PositionUnit;
    readonly left?: PositionUnit;

}