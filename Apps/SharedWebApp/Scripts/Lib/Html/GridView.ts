import { ContextualClass } from "../ContextualClass";
import { EnumerableRange, MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { Block } from "./Block";
import { CssLengthUnit } from "./CssLengthUnit";
import { GridCellView } from "./GridCellView";
import { GridRowView } from "./GridRowView";
import { GridViewModel } from "./GridViewModel";
import { ViewEvents } from "./ViewEvents";

export type GridTemplateCss = CssLengthUnit | GridTemplateMinMax | GridTemplateRepeat | GridTemplateFitContent;

export class GridTemplateFitContent {
    readonly value: string;

    constructor(length: CssLengthUnit) {
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

export class GridView extends Block {
    protected readonly vm: GridViewModel;
    private context: ContextualClass;
    private readonly cells: GridCellView[] = [];
    private readonly rows: GridRowView[] = [];

    constructor(vm: GridViewModel = new GridViewModel()) {
        super(vm);
        this.addCssName('grid');
    }

    protected setStyle: (config: (style: IGridStyle) => void) => void;

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    borderless() { this.addCssName('grid-borderless'); }

    clearContents() {
        for (let cell of this.cells) {
            this.removeItem(cell);
        }
        for (let row of this.rows) {
            this.removeItem(row);
        }
    }

    setContext(context: ContextualClass) {
        let contextCss = context ? context.append('grid') : '';
        this.replaceCssName(this.context ? this.context.append('grid') : '', contextCss);
        this.context = context;
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
        let value = new JoinedStrings(
            ' ',
            new MappedArray(
                columns,
                c => c.toString()
            )
        ).value();
        this.setStyle(style => style['grid-template-columns'] = value);
    }

    setTemplateRows(...rows: GridTemplateCss[]) {
        let value = new JoinedStrings(
            ' ',
            new MappedArray(
                rows,
                c => c.toString()
            )
        ).value();
        this.setStyle(style => style['grid-template-rows'] = value);
    }

    addCell<TView extends GridCellView>(
        createCellView: () => TView = () => new GridCellView() as TView
    ) {
        return this.addCells(1, createCellView)[0];
    }

    addCells<TView extends GridCellView>(
        howMany: number,
        createCellView: () => TView = () => new GridCellView() as TView
    ) {
        const cells = new MappedArray(
            new EnumerableRange(1, howMany),
            () => createCellView()
        ).value();
        for (const cell of cells) {
            this.addContent(cell);
            this.cells.push(cell);
        }
        return cells;
    }

    cell(index: number) { return this.cells[index]; }

    addRow<TRowView extends GridRowView>(
        createRowView: () => TRowView = () => new GridRowView() as TRowView
    ) {
        return this.addRows(1, createRowView)[0];
    }

    addRows<TRowView extends GridRowView>(
        howManyRows: number,
        createRowView: () => TRowView = () => new GridRowView() as TRowView
    ) {
        const rows = new MappedArray(
            new EnumerableRange(1, howManyRows),
            () => createRowView()
        ).value();
        for (const row of rows) {
            this.addContent(row);
            this.rows.push(row);
        }
        return rows;
    }

    row(index: number) { return this.rows[index]; }
}