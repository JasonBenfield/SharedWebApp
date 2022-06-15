import { EnumerableRange, MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { Block } from "./Block";
import { CssLengthUnit } from "./CssLengthUnit";
import { GridCellView } from "./GridCellView";
import { GridViewModel } from "./GridViewModel";
import { ViewEvents } from "./ViewEvents";

export type GridTemplateCss = CssLengthUnit | GridTemplateMinMax | GridTemplateRepeat;

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

    constructor(vm: GridViewModel = new GridViewModel()) {
        super(vm);
        this.addCssName('grid');
    }

    protected setStyle: (config: (style: IGridStyle) => void) => void;

    readonly events = new ViewEvents(this, (options) => this.vm.xtiEvent(options));

    borderless() { this.addCssName('grid-borderless'); }

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

    addHeader() {
        return this.addHeaders(1)[0];
    }

    addHeaders(howMany: number) {
        let headers = new MappedArray(
            new EnumerableRange(1, howMany),
            i => GridCellView.header()
        ).value();
        for (let cell of headers) {
            this.addContent(cell);
        }
        return headers;
    }

    addCell() {
        return this.addCells(1)[0];
    }

    addCells(howMany: number) {
        let cells = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new GridCellView()
        ).value();
        for (let cell of cells) {
            this.addContent(cell);
        }
        return cells;
    }

    addFooter() {
        return this.addFooters(1)[0];
    }

    addFooters(howMany: number) {
        let footers = new MappedArray(
            new EnumerableRange(1, howMany),
            i => GridCellView.footer()
        ).value();
        for (let footer of footers) {
            this.addContent(footer);
        }
        return footers;
    }

    addRow() {
        return this.addRows(1)[0];
    }

    addRows(howMany: number) {
        let rows = new MappedArray(
            new EnumerableRange(1, howMany),
            i => new Block().configure(b => b.addCssName('d-contents'))
        ).value();
        for (let row of rows) {
            this.addContent(row);
        }
        return rows;
    }
}