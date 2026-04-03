import { ContextualClass } from "../Bootstrap/ContextualClass";
import { DisplayCss } from "../Bootstrap/DisplayCss";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { ICssStyle, ICssStyles } from "../CssStyle";
import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { IStyleableComponentView } from "./StyleableComponentView";
import { Constructor } from "./Types";

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

export interface IGridViewLayout {
    [name: string]: BaseGridRowView;
}

class GridCss extends CssClass {
    private _type = "";

    bordered() {
        this._type = "grid-bordered";
        return this;
    }

    borderless() {
        this._type = "grid-bordered";
        return this;
    }

    layout() {
        this._type = "grid-layout";
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        classNames.push("grid");
        if (!this._type) {
            classNames.push(this._type);
        }
        return classNames.join(" ");
    }
}

export function GridViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
    return class extends Base {
        constructor(...args: any[]) {
            super(...args);
            this.setCss(DisplayCss.grid());
            this.setCss(this.gridCss);
        }

        private readonly _gridStyle = new GridCssStyle();

        setTemplateColumns(...columns: GridTemplateCss[]) {
            return this.setGridStyle(s => s.setTemplateColumns(...columns));;
        }

        setTemplateRows(...rows: GridTemplateCss[]) {
            return this.setGridStyle(s => s.setTemplateRows(...rows));
        }

        setColumnGap(length: CssLengthUnit) {
            return this.setGridStyle(s => s.setColumnGap(length));
        }

        setRowGap(length: CssLengthUnit) {
            return this.setGridStyle(s => s.setRowGap(length));
        }

        setAutoColumns(columns: GridTemplateCss) {
            return this.setGridStyle(s => s.setAutoColumns(columns));
        }

        setAutoRows(rows: GridTemplateCss) {
            return this.setGridStyle(s => s.setAutoRows(rows));
        }

        private setGridStyle(configure: (style: GridCssStyle) => void) {
            configure(this._gridStyle);
            this.setStyle(this._gridStyle);
            return this;
        }

        private readonly gridCss = new GridCss();

        styleAsBordered() {
            this.gridCss.bordered();
            return this.setCss(this.gridCss);
        }

        styleAsBorderless() {
            this.gridCss.borderless();
            return this.setCss(this.gridCss);
        }

        styleAsLayout() {
            this.gridCss.layout();
            return this.setCss(this.gridCss);
        }

        protected addRowLayout<T extends IGridViewLayout>(layout: T) {
            return this.addLayout(layout);
        }

        protected addRow<T extends BaseGridRowView>(row: T) {
            return this.addChildView<T>(row);
        }

        protected addRows<T extends BaseGridRowView>(...rows: T[]) {
            for (const row of rows) {
                this.addChildView(row);
            }
            return rows;
        }
    };
}

class GridRowCss extends CssClass {
    private _context = ContextualClass.default;

    context(context: ContextualClass) {
        this._context = context;
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        classNames.push("grid-row");
        if (!this._context.equals(ContextualClass.default)) {
            classNames.push(this._context.append("grid-row-context"));
        }
        return classNames.join(" ");
    }
}

export type BaseGridRowView = ComponentView & IGridRowView;

export interface IGridRowView {
    calculateTotalWidth(): number;
    setContext(context: ContextualClass): this;
}

type BaseGridCellView = ComponentView & IGridCellView;

export interface IGridRowViewLayout {
    [name: string]: BaseGridCellView;
}

export function GridRowViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
    return class extends Base implements IGridRowView {
        constructor(...args: any[]) {
            super(...args);
            this.setCss(DisplayCss.contents());
            this.setCss(this.gridRowCss);
        }

        private readonly gridRowCss = new GridRowCss();

        calculateTotalWidth() {
            let width = 0;
            const cells = this.getCells();
            for (const cell of cells) {
                width += cell.offsetWidth;
            }
            return width;
        }

        setContext(context: ContextualClass) {
            return this.setGridRowCss(css => css.context(context));
        }

        protected setGridRowCss(configure: (css: GridRowCss) => void) {
            configure(this.gridRowCss);
            this.setCss(this.gridRowCss);
            return this;
        }

        addCellLayout<T extends IGridRowViewLayout>(layout: T) {
            return this.addLayout(layout);
        }

        addCell<T extends BaseGridRowView>(cell: T) {
            return this.addChildView<T>(cell);
        }

        addCells<T extends BaseGridRowView>(...cells: T[]) {
            for (const cell of cells) {
                this.addChildView(cell);
            }
            return cells;
        }

        getCells() { return this.getChildViews() as BaseGridCellView[]; }
    };
}

class GridCellCss extends CssClass {
    protected buildCss() {
        return "grid-cell";
    }
}

export class GridCellCssStyle implements ICssStyle {
    private readonly style: ICssStyles = {};

    setGridColumn(start: number | GridSpan, end?: number | GridSpan) {
        this.style["grid-column"] = this.rangeValue(start, end);
        return this;
    }

    setGridRow(start: number | GridSpan, end?: number | GridSpan) {
        this.style["grid-row"] = this.rangeValue(start, end);
        return this;
    }

    private rangeValue(start: number | GridSpan, end?: number | GridSpan) {
        let range = start.toString();
        if (end) {
            range += ` / ${end.toString()}`;
        }
        return range;
    }

    toStyle() {
        return this.style;
    }
}

export interface IGridCellView {
    get offsetWidth(): number;
    setGridColumn(start: number | GridSpan, end?: number | GridSpan): void;
    setGridRow(start: number | GridSpan, end?: number | GridSpan): void;
}

export function GridCellViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
    return class extends Base implements IGridCellView {
        constructor(...args: any[]) {
            super(...args);
            this.setCss(new GridCellCss());
        }

        private readonly cellStyle = new GridCellCssStyle();

        get offsetWidth() {
            const element = this.element;
            return element?.offsetWidth || 0;
        }

        setGridColumn(start: number | GridSpan, end?: number | GridSpan) {
            return this.setGridCellStyle(s => s.setGridColumn(start, end));
        }

        setGridRow(start: number | GridSpan, end?: number | GridSpan) {
            return this.setGridCellStyle(s => s.setGridRow(start, end));
        }

        private setGridCellStyle(configure: (style: GridCellCssStyle) => void) {
            configure(this.cellStyle);
            this.setStyle(this.cellStyle);
            return this;
        }
    }
}

export class GridView<TLayout extends IGridViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout> extends GridViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static block<TLayout extends IGridViewLayout>(layout: TLayout) {
        return new GridView(
            "div", layout, l => l
        ).asLayout();
    }

    declare addRowLayout: <T extends IGridViewLayout>(layout: T) => T;

    declare addRow: <T extends BaseGridRowView>(row: T) => T;

    declare addRows: <T extends BaseGridRowView>(...rows: T[]) => T[];
}

export class GridRowView<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static block<TLayout extends IGridRowViewLayout>(layout: TLayout) {
        return new GridRowView(
            "div", layout, l => l
        ).asLayout();
    }
    static listItem<TLayout extends IGridRowViewLayout>(layout: TLayout) {
        return new GridRowView(
            "li", layout, l => l
        ).asLayout();
    }
}

export class GridRowLinkView<TLayout extends IGridRowViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static create<TLayout extends IGridRowViewLayout>(layout: TLayout) {
        return new GridRowLinkView(
            layout, l => l
        ).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("a", layout, toPublicLayout);
    }
}

export class GridCellView<TLayout extends IComponentViewLayout, TPublicLayout extends ComponentView | IComponentViewLayout> extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static block<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new GridCellView(
            "div", layout, l => l
        ).asLayout();
    }
}