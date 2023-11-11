import { ContextualClass } from "../ContextualClass";
import { CssLengthUnit } from "../CssLengthUnit";
import { JoinedStrings } from "../JoinedStrings";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { IClickConfig, IGridCellStyle, IGridStyle, IHtmlElementView, ILinkAttributes, ILinkView, TargetValue, ViewConstructor } from "./Types";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export type GridTemplateCss = CssLengthUnit | GridTemplateMinMax | GridTemplateRepeat | GridTemplateFitContent;

export class GridTemplateCssValue {
    private readonly templates: GridTemplateCss[];

    constructor(...templates: GridTemplateCss[]) {
        this.templates = templates;
    }

    value() {
        return new JoinedStrings(
            ' ',
            this.templates.map(c => c.toString())
        ).value();
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
        this.value = size ? `span ${size}` : 'span';
    }

    toString() { return this.value; }
}

export class GridView extends BasicComponentView {
    private readonly cells: GridCellView[] = [];
    private readonly rows: BasicGridRowView[] = [];

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid');
    }

    protected setStyle: (config: (style: IGridStyle) => void) => void;

    borderless() { this.addCssName('grid-borderless'); }

    layout() { this.addCssName('grid-layout'); }

    height100() { this.addCssName('h-100'); }

    clearContents() {
        this.cells.splice(0, this.cells.length);
        this.rows.splice(0, this.rows.length);
        this.disposeAllViews();
    }

    setContext(context: ContextualClass) {
        this.setCss('grid', context.append('grid'));
    }

    setColumnGap(length: CssLengthUnit) {
        this.setStyle(style => style['column-gap'] = length.value());
    }

    setRowGap(length: CssLengthUnit) {
        this.setStyle(style => style['row-gap'] = length.value());
    }

    setAutoColumns(columns: GridTemplateCss) {
        this.setStyle(style => style['grid-auto-columns'] = columns.toString());
    }

    setAutoRows(rows: GridTemplateCss) {
        this.setStyle(style => style['grid-auto-rows'] = rows.toString());
    }

    setTemplateColumns(...columns: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...columns).value();
        this.setStyle(style => style['grid-template-columns'] = value);
    }

    setTemplateRows(...rows: GridTemplateCss[]) {
        const value = new GridTemplateCssValue(...rows).value();
        this.setStyle(style => style['grid-template-rows'] = value);
    }

    addCell<TView extends GridCellView>(ctor?: ViewConstructor<TView>) {
        return this.addCells(1, ctor)[0];
    }

    addCells<TView extends GridCellView>(howMany: number, ctor?: ViewConstructor<TView>) {
        const cells = this.addViews(howMany, ctor || GridCellView) as TView[];
        this.cells.push(...cells);
        return cells;
    }

    cell(index: number) { return this.cells[index]; }

    getCells() { return this.cells.map(c => c); }

    addRow<TRowView extends BasicGridRowView>(ctor?: ViewConstructor<TRowView>) {
        return this.addRows(1, ctor)[0];
    }

    addRows<TRowView extends BasicGridRowView>(howManyRows: number, ctor?: ViewConstructor<TRowView>) {
        if (!ctor) {
            ctor = GridRowView as any;
        }
        const rows = this.addViews(howManyRows, ctor) as TRowView[];
        this.rows.push(...rows);
        return rows;
    }

    row(index: number) { return this.row[index]; }

    getRows() { return this.rows.map(r => r); }
}

export class BasicGridRowView extends BasicContainerView {
    constructor(container: BasicComponentView, createElementView: IHtmlElementView) {
        super(container, createElementView);
        this.addCssName('d-contents');
        this.addCssName('grid-row');
    }

    calculateTotalWidth() {
        let width = 0;
        const cells = this.getCells();
        for (const cell of cells) {
            width += cell.offsetWidth;
        }
        return width;
    }

    stickyAtTop() {
        this.addCssName('position-sticky-top');
    }

    stickyAtBottom() {
        this.addCssName('position-sticky-bottom');
    }

    setContext(context: ContextualClass) {
        this.setCss('grid-row-context', context.append('grid-row'));
    }

    clearContents() {
        this.disposeAllViews();
    }

    addCell<TView extends GridCellView>(ctor?: ViewConstructor<TView>) {
        return this.addCells(1, ctor)[0];
    }

    addCells<TView extends GridCellView>(howMany: number, ctor?: ViewConstructor<TView>) {
        return this.addViews(howMany, ctor || GridCellView) as TView[];
    }

    cell(index: number) { return this.getViewByIndex(index) as GridCellView; }

    getCells() { return this.getViews() as GridCellView[]; }

}

export class GridRowView extends BasicGridRowView {
    private clickConfig: IClickConfig;

    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.configureClick(b => b.select('grid-cell'));
    }

    configureClick(clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder) {
        this.clickConfig = clickConfig;
    }

    handleClick(action: (element: HTMLElement) => void) {
        this.clickConfig(this.on('click').execute(action)).subscribe();
    }
}

export class LinkGridRowView extends BasicGridRowView implements ILinkView {
    private clickConfig: IClickConfig;

    constructor(container: BasicComponentView) {
        super(container, 'a');
        this.configureClick(b => b.select('grid-cell'));
    }

    protected setAttr: (config: (attr: ILinkAttributes) => void) => void;

    setHref(href: string) {
        this.setAttr(attr => attr.href = href);
    }

    setTarget(target: TargetValue) {
        this.setAttr(attr => attr.target = target);
    }

    configureClick(clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder) {
        this.clickConfig = clickConfig;
    }

    handleClick(action: (element: HTMLElement) => void) {
        this.clickConfig(this.on('click').execute(action)).subscribe();
    }
}

export class GridCellView extends BasicContainerView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('grid-cell');
    }

    positionRelative() {
        this.addCssName('position-relative');
    }

    protected setStyle: (config: (style: IGridCellStyle) => void) => void;

    scrollable() { this.addCssName('scrollable'); }

    stickyAtTop() {
        this.addCssName('position-sticky-top');
    }

    stickyAtBottom() {
        this.addCssName('position-sticky-bottom');
    }

    stickyAtLeft() {
        this.addCssName('position-sticky-left');
    }

    stickyAtRight() {
        this.addCssName('positiion-sticky-right');
    }

    setGridColumn(start: number | GridSpan, end?: number | GridSpan) {
        this.setStyle(style => style["grid-column"] = this.rangeValue(start, end));
    }

    setGridRow(start: number | GridSpan, end?: number | GridSpan) {
        this.setStyle(style => style["grid-row"] = this.rangeValue(start, end));
    }

    private rangeValue(start: number | GridSpan, end: number | GridSpan) {
        let range = start.toString();
        if (end) {
            range += ` / ${end.toString()}`;
        }
        return range;
    }
}