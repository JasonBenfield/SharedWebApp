import { ContextualClass } from "../Bootstrap/ContextualClass";
import { DisplayCss } from "../Bootstrap/DisplayCss";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { ICssStyle, ICssStyles } from "../CssStyle";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { ILinkView, LinkViewMixin } from "./LinkComponent";
import { IStyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, ITextView, TextViewMixin, TitleViewMixin } from "./TextComponent";
import { BaseTextLinkComponentView } from "./TextLinkComponent";
import { Constructor, HeadingSize } from "./Types";

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

export type GridViewLayout<T> = {
    [K in keyof T]: BaseGridRowView;
}

class GridCss extends CssClass {
    private type = "";

    bordered() {
        this.type = "grid-bordered";
        return this;
    }

    borderless() {
        this.type = "grid-bordered";
        return this;
    }

    layout() {
        this.type = "grid-layout";
        return this;
    }

    protected buildCss() {
        const classNames: string[] = [];
        classNames.push("grid");
        if (this.type) {
            classNames.push(this.type);
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
            return this.setGridCss(css => css.bordered());
        }

        styleAsBorderless() {
            return this.setGridCss(css => css.borderless());
        }

        styleAsLayout() {
            return this.setGridCss(css => css.layout());
        }

        private setGridCss(configure: (css: GridCss) => void) {
            configure(this.gridCss);
            return this.setCss(this.gridCss);
        }

        protected addRowLayout<T extends GridViewLayout<T>>(layout: T) {
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

export type GridRowViewLayout<T> = {
    [K in keyof T]: BaseGridCellView;
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

        addCellLayout<T extends GridRowViewLayout<T>>(layout: T) {
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

export class GridView<TLayout extends GridViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static block<TLayout extends GridViewLayout<TLayout>>(layout: TLayout) {
        return new GridView("div", layout, l => l).asLayout();
    }

    declare asLayout: () => GridView<TLayout, TPublicLayout> & TLayout;

    declare addRowLayout: <TLayout extends GridViewLayout<TLayout>>(layout: TLayout) => TLayout;

    declare addRow: <T extends BaseGridRowView>(row: T) => T;

    declare addRows: <T extends BaseGridRowView>(...rows: T[]) => T[];
}

export class GridRowView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static block<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return new GridRowView("div", layout, l => l).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return new GridRowView("li", layout, l => l).asLayout();
    }

    declare asLayout: () => GridRowView<TLayout, TPublicLayout> & TLayout;
}

export class GridRowTextCompositeView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> implements ITextView {
    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowTextCompositeView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowTextCompositeView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridRowTextCompositeView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridRowTextLinkView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> implements ITextView, ILinkView {
    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowTextLinkView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowTextLinkView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridRowTextLinkView<TLayout, TPublicLayout> & TLayout;

    setHref(href: string) {
        this.publicLayout.setHref(href);
    }

    setTarget(target: string) {
        this.publicLayout.setTarget(target);
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class BaseGridRowViewMixin<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

export class GridRowLinkView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends LinkViewMixin(BaseGridRowViewMixin)<TLayout, TPublicLayout> {
    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return new GridRowLinkView(layout, l => l).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowLinkView<TLayout, TPublicLayout> & TLayout;
}

export class GridRowLinkWithTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends LinkViewMixin(BaseGridRowViewMixin)<TLayout, TPublicLayout> implements ITextView {
    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowLinkWithTextView(layout, toPublicLayout).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowLinkWithTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string): void {
        this.publicLayout.setText(text);
    }

}

export class GridCellView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return new GridCellView("div", layout, l => l).asLayout();
    }

    declare asLayout: () => GridCellView<TLayout, TPublicLayout> & TLayout;
}

export class GridCellTextCompositeView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> implements ITextView {
    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellTextCompositeView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridCellTextCompositeView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridCellTextView extends GridCellViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView)))) {
    static block() {
        return new GridCellTextView("div");
    }

    static span() {
        return new GridCellTextView("span");
    }

    static strong() {
        return new GridCellTextView("strong");
    }

    static small() {
        return new GridCellTextView("small");
    }

    static heading(size: HeadingSize) {
        return new GridCellTextView(`h${size}`);
    }
}

export class GridCellTextLinkView extends GridCellViewMixin(LinkViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentViewMixin(ComponentView))))) {
    static create() {
        return new GridCellTextLinkView();
    }

    constructor() {
        super("a");
    }
}

export class GridCellTextLinkCompositeView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView> extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> implements ITextView, ILinkView {
    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellTextLinkCompositeView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridCellTextLinkCompositeView<TLayout, TPublicLayout> & TLayout;

    setHref(href: string) {
        this.publicLayout.setHref(href);
    }

    setTarget(target: string) {
        this.publicLayout.setTarget(target);
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class BaseGridCellViewMixin<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

export class GridCellLinkWithTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView> extends LinkViewMixin(BaseGridCellViewMixin)<TLayout, TPublicLayout> implements ITextView {
    static create<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellLinkWithTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout)
    }

    declare asLayout: () => GridCellLinkWithTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}