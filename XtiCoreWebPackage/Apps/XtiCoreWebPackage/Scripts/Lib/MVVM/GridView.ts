import { CssLengthUnit } from "../CssLengthUnit";
import { ICssStyle, ICssStyles } from "../CssStyle";
import { ComponentView } from "./ComponentView";
import { StyleableComponentViewMixin } from "./StyleableComponentView";

export type GridTemplateCss = CssLengthUnit | GridTemplateMinMax | GridTemplateRepeat | GridTemplateFitContent;

export class GridTemplateCssValue {
    private readonly templates: GridTemplateCss[];

    constructor(...templates: GridTemplateCss[]) {
        this.templates = templates;
    }

    value() {
        return this.templates.join(" ");
    }

    toString() { return this.value(); }
}

export class GridTemplateFitContent {
    readonly value: string;

    constructor(readonly length: CssLengthUnit) {
        this.value = `fit-content(${length.value()})`;
    }

    toString() { return this.value; }
}

export class GridTemplateMinMax {
    readonly value: string;

    constructor(min: CssLengthUnit, max: CssLengthUnit) {
        this.value = `minmax(${min}, ${max})`;
    }

    toString() { return this.value; }
}

export class GridTemplateRepeat {
    readonly value: string;

    constructor(quantity: number, length: CssLengthUnit) {
        this.value = `repeat(${quantity}, ${length})`;
    }

    toString() { return this.value; }
}

export class GridSpan {
    readonly value: string;

    constructor(size?: number) {
        this.value = size ? `span ${size}` : "span";
    }

    toString() { return this.value; }
}

export class GridCssStyle implements ICssStyle {
    private readonly style: ICssStyles = {};

    setColumnGap(length: CssLengthUnit) {
        this.style["column-gap"] = length.value();
        return this;
    }

    setRowGap(length: CssLengthUnit) {
        this.style["row-gap"] = length.value();
        return this;
    }

    setAutoColumns(columns: GridTemplateCss) {
        this.style["grid-auto-columns"] = columns.toString();
        return this;
    }

    setAutoRows(rows: GridTemplateCss) {
        this.style["grid-auto-rows"] = rows.toString();
        return this;
    }

    setTemplateColumns(...columns: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...columns).value();
        this.style["grid-template-columns"] = value;
        return this;
    }

    setTemplateRows(...rows: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...rows).value();
        this.style["grid-template-rows"] = value;
        return this;
    }

    toStyle() {
        return this.style;
    }
}

export class GridView extends StyleableComponentViewMixin(ComponentView) {
    constructor() {
        super("div");
    }
}