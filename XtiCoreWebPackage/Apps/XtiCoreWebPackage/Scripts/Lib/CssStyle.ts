import { CssLengthUnit } from "./CssLengthUnit";

export interface ICssStyles {
    [name: string]: string;
}

export interface ICssStyle {
    toStyle(): ICssStyles;
}

export class HeightCssStyle implements ICssStyle {
    private readonly style: ICssStyles = {};

    setHeight(height: CssLengthUnit) {
        this.style["height"] = height.value();
    }

    setMinHeight(minHeight: CssLengthUnit) {
        this.style["min-height"] = minHeight.value();
    }

    setMaxHeight(maxHeight: CssLengthUnit) {
        this.style["max-height"] = maxHeight.value();
    }

    toStyle() {
        return this.style;
    }
}

export class WidthCssStyle implements ICssStyle {
    private readonly style: ICssStyles = {};

    setWidth(width: CssLengthUnit) {
        this.style["width"] = width.value();
    }

    setMinWidth(minWidth: CssLengthUnit) {
        this.style["min-width"] = minWidth.value();
    }

    setMaxWidth(maxWidth: CssLengthUnit) {
        this.style["max-width"] = maxWidth.value();
    }

    toStyle() {
        return this.style;
    }
}

export class PositionUnit {
    static em(size: number) { return new PositionUnit(size, "em"); }

    static rem(size: number) { return new PositionUnit(size, "rem"); }

    static px(size: number) { return new PositionUnit(size, "px"); }

    static percentage(size: number) { return new PositionUnit(size, "%"); }

    static zero() { return new PositionUnit(0, ""); }

    private readonly css: string;

    protected constructor(readonly size: number, readonly unit: string) {
        this.css = size ? `${size}${unit}` : "0";
    }

    value() { return this.css; }

    toString() { return this.value(); }
}

export class PositionCssStyle implements ICssStyle {
    static fill() {
        return new PositionCssStyle({
            top: PositionUnit.zero(),
            right: PositionUnit.zero(),
            bottom: PositionUnit.zero(),
            left: PositionUnit.zero()
        });
    }

    static fillHorizontal() {
        return new PositionCssStyle({
            top: PositionUnit.zero(),
            right: PositionUnit.zero(),
            left: PositionUnit.zero()
        });
    }

    constructor(value?: { top?: PositionUnit, right?: PositionUnit, bottom?: PositionUnit, left?: PositionUnit }) {
        if (value) {
            if (value.top) {
                this.style["top"] = value.top.value();
            }
            if (value.right) {
                this.style["right"] = value.right.value();
            }
            if (value.bottom) {
                this.style["bottom"] = value.bottom.value();
            }
            if (value.left) {
                this.style["left"] = value.left.value();
            }
        }
    }

    private readonly style: ICssStyles = {};

    toStyle() {
        return this.style;
    }

}