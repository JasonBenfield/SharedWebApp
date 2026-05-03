import { ContextualClass } from "../Bootstrap/ContextualClass";
import { DisplayCss } from "../Bootstrap/DisplayCss";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { ICssStyle, ICssStyles } from "../CssStyle";
import { ButtonViewMixin, IButtonView } from "./ButtonComponent";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { IContainerComponentView } from "./ContainerComponent";
import { ILabelView, LabelViewMixin } from "./LabelComponent";
import { ILinkView, LinkViewMixin } from "./LinkComponent";
import { StyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextButtonComponentView } from "./TextButtonComponent";
import { BaseTextComponentView, ITextView, TextViewMixin, TitleViewMixin } from "./TextComponent";
import { BaseTextLabelComponentView } from "./TextLabelComponent";
import { BaseTextLinkComponentView } from "./TextLinkComponent";
import { Constructor, HeadingSize, ITitleView } from "./Types";

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

export interface IGridView {
    setTemplateColumns(...columns: GridTemplateCss[]): this;
    setTemplateRows(...rows: GridTemplateCss[]): this;
    setColumnGap(length: CssLengthUnit): this;
    setRowGap(length: CssLengthUnit): this;
    setAutoColumns(columns: GridTemplateCss): this;
    setAutoRows(rows: GridTemplateCss): this;
    styleAsBordered(): this;
    styleAsBorderless(): this;
    styleAsLayout(): this;
}

export function GridViewMixin<T extends Constructor<StyleableComponentView>>(Base: T): T & Constructor<IGridView> {
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

export interface IGridRowViewMixin {
    calculateTotalWidth(): number;
    setContext(context: ContextualClass): this;
    addCellLayout<T extends GridRowViewLayout<T>>(layout: T): T;
    addCell<T extends BaseGridCellView>(cell: T): T;
    addCells<T extends BaseGridCellView>(...cells: T[]): T[];
    getCells(): BaseGridCellView[];
}

export function GridRowViewMixin<T extends Constructor<StyleableComponentView>>(Base: T): T & Constructor<IGridRowView> & Constructor<IGridRowViewMixin> {
    return class extends Base {
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

        addCell<T extends BaseGridCellView>(cell: T) {
            return this.addChildView<T>(cell);
        }

        addCells<T extends BaseGridCellView>(...cells: T[]) {
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

export function GridCellViewMixin<T extends Constructor<StyleableComponentView>>(Base: T): T & Constructor<IGridCellView> {
    return class extends Base {
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

class BaseGridRowCompositeView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridRowViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

class BaseGridRowTitleView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends TitleViewMixin(BaseGridRowCompositeView)<TLayout, TPublicLayout> {
}

export class GridRowContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends TitleViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements ITitleView, ITextView {

    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridRowContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridRowContainerOfTextLinkView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>
    extends BaseGridRowTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView, ILinkView {

    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextLinkView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextLinkView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridRowContainerOfTextLinkView<TLayout, TPublicLayout> & TLayout;

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

export class GridRowLinkView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends LinkViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements ILinkView, ITitleView {

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

export class GridRowLinkContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends LinkViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements ILinkView, ITitleView, ITextView {

    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowLinkContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowLinkContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string): void {
        this.publicLayout.setText(text);
    }

}

export class GridRowLabelView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends LabelViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements ITitleView, ILabelView {

    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return new GridRowLabelView(layout, l => l).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("label", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowLabelView<TLayout, TPublicLayout> & TLayout;
}

export class GridRowButtonView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends ButtonViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements IButtonView, ITitleView {

    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return new GridRowButtonView(layout, l => l).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("button", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowButtonView<TLayout, TPublicLayout> & TLayout;
}

export class GridRowContainerOfTextLabelView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>
    extends BaseGridRowTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView, ILabelView {
    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextLabelView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextLabelView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridRowContainerOfTextLabelView<TLayout, TPublicLayout> & TLayout;

    setFor(forID: string) {
        this.publicLayout.setFor(forID);
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridRowContainerOfTextButtonView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>
    extends BaseGridRowTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView, IButtonView {

    static block<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextButtonView("div", layout, toPublicLayout).asLayout();
    }
    static listItem<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowContainerOfTextButtonView("li", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridRowContainerOfTextButtonView<TLayout, TPublicLayout> & TLayout;

    readonly when = this.publicLayout.when;

    enable() {
        this.publicLayout.enable();
    }

    disable() {
        this.publicLayout.disable();
    }

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridRowLabelContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends LabelViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements ILabelView, ITitleView, ITextView {

    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowLabelContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("label", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowLabelContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string): void {
        this.publicLayout.setText(text);
    }
}

export class GridRowButtonContainerOfTextView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends ButtonViewMixin(BaseGridRowTitleView)<TLayout, TPublicLayout>
    implements IButtonView, ITitleView, ITextView {

    static create<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridRowButtonContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("button", layout, toPublicLayout);
    }

    declare asLayout: () => GridRowButtonContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string): void {
        this.publicLayout.setText(text);
    }
}

export class GridCellView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {

    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return GridCellView.blockWithPublicLayout(layout, l => l);
    }

    static blockWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellView("div", layout, toPublicLayout).asLayout();
    }

    static paragraph<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return GridCellView.paragraphWithPublicLayout(layout, l => l);
    }

    static paragraphWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellView("p", layout, toPublicLayout).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return GridCellView.spanWithPublicLayout(layout, l => l);
    }

    static spanWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellView("span", layout, toPublicLayout).asLayout();
    }

    static preformat<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return GridCellView.preformatWithPublicLayout(layout, l => l);
    }

    static preformatWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellView("pre", layout, toPublicLayout).asLayout();
    }

    static heading<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(size: HeadingSize, layout: TLayout) {
        return GridCellView.headingWithPublicLayout(size, layout, l => l);
    }

    static headingWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(size: HeadingSize, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellView(`h${size}`, layout, toPublicLayout);
    }

    declare asLayout: () => GridCellView<TLayout, TPublicLayout> & TLayout;
}

export class GridCellContainerView
    extends GridCellViewMixin(StyleableComponentView)
    implements IContainerComponentView {

    static block() {
        return new GridCellContainerView("div");
    }

    static span() {
        return new GridCellContainerView("span");
    }

    static paragraph() {
        return new GridCellContainerView("p");
    }

    static preformat() {
        return new GridCellContainerView("pre");
    }

    static heading(size: HeadingSize) {
        return new GridCellContainerView(`h${size}`);
    }

    declare public addLayout: <TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) => this & TLayout;
    declare public addChildView: <T extends ComponentView>(view: T) => T;
    declare public insertChildView: <T extends ComponentView>(view: T, index: number) => T;
    declare public removeAllChildViews: () => void;
    declare public removeChildView: (view: ComponentView) => void;

}

class BaseGridCellCompositeView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends GridCellViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

class BaseGridCellTitleView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends TitleViewMixin(BaseGridCellCompositeView)<TLayout, TPublicLayout> {
}

export class GridCellTextView extends GridCellViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentView)))
    implements ITitleView, ITextView {

    static block() {
        return new GridCellTextView("div");
    }

    static paragraph() {
        return new GridCellTextView("p");
    }

    static blockQuote() {
        return new GridCellTextView("blockquote");
    }

    static inlineQuote() {
        return new GridCellTextView("q");
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

    static emphasis() {
        return new GridCellTextView("em");
    }

    static preformat() {
        return new GridCellTextView("pre");
    }

    static deleted() {
        return new GridCellTextView("del");
    }

    static inserted() {
        return new GridCellTextView("ins");
    }

    static strikethrough() {
        return new GridCellTextView("s");
    }

    static superscript() {
        return new GridCellTextView("sup");
    }

    static subscript() {
        return new GridCellTextView("sub");
    }

    static heading(size: HeadingSize) {
        return new GridCellTextView(`h${size}`);
    }
}

export class GridCellTextLinkView
    extends GridCellViewMixin(LinkViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentView))))
    implements ITextView, ITitleView, ILinkView {

    static create() {
        return new GridCellTextLinkView();
    }

    constructor() {
        super("a");
    }
}

export class GridCellTextLabelView
    extends GridCellViewMixin(LabelViewMixin(TitleViewMixin(TextViewMixin(StyleableComponentView))))
    implements ITextView, ITitleView, ILabelView {

    static create() {
        return new GridCellTextLabelView();
    }

    constructor() {
        super("label");
    }
}

export class GridCellLinkView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends LinkViewMixin(BaseGridCellTitleView)<TLayout, TPublicLayout>
    implements ILinkView {

    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return new GridCellLinkView(layout, l => l).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => GridCellLinkView<TLayout, TPublicLayout> & TLayout;
}

export class GridCellLabelView<TLayout extends GridRowViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends LabelViewMixin(BaseGridCellTitleView)<TLayout, TPublicLayout>
    implements ITitleView, ILabelView {

    static create<TLayout extends GridRowViewLayout<TLayout>>(layout: TLayout) {
        return new GridCellLabelView(layout, l => l).asLayout();
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        super("label", layout, toPublicLayout);
    }

    declare asLayout: () => GridCellLabelView<TLayout, TPublicLayout> & TLayout;
}

export class GridCellContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends BaseGridCellTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView {

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellContainerOfTextView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridCellContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridCellContainerOfTextLinkView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>
    extends BaseGridCellTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView, ILinkView {

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLinkComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellContainerOfTextLinkView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridCellContainerOfTextLinkView<TLayout, TPublicLayout> & TLayout;

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

export class GridCellContainerOfTextLabelView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>
    extends BaseGridCellTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView, ILabelView {

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextLabelComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellContainerOfTextLabelView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridCellContainerOfTextLabelView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }

    setFor(forID: string) {
        this.publicLayout.setFor(forID);
    }
}

export class GridCellContainerOfTextButtonView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>
    extends BaseGridCellTitleView<TLayout, TPublicLayout>
    implements ITitleView, ITextView, IButtonView {

    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextButtonComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellContainerOfTextButtonView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => GridCellContainerOfTextButtonView<TLayout, TPublicLayout> & TLayout;

    readonly when = this.publicLayout.when;

    enable() {
        this.publicLayout.enable();
    }

    disable() {
        this.publicLayout.disable();
    }


    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridCellLinkContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends LinkViewMixin(BaseGridCellTitleView)<TLayout, TPublicLayout>
    implements ITitleView, ILinkView, ITextView {

    static create<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellLinkContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout)
    }

    declare asLayout: () => GridCellLinkContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class GridCellLabelContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>
    extends LabelViewMixin(BaseGridCellTitleView)<TLayout, TPublicLayout>
    implements ITitleView, ILabelView, ITextView {

    static create<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new GridCellLabelContainerOfTextView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("label", layout, toPublicLayout)
    }

    declare asLayout: () => GridCellLabelContainerOfTextView<TLayout, TPublicLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}