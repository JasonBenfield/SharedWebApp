import { GridCellView } from "../Html/GridCellView";
import { ODataColumn } from "./ODataColumn";
import { TextCellLayout } from "./TextCellLayout";
import { ICellLayout } from "./Types";

export class ODataColumnLayouts {
    private _defaultLayout: ICellLayout;
    private readonly layouts: ICellLayout[] = [];

    constructor(defaultLayout: ICellLayout = new TextCellLayout()) {
        this._defaultLayout = defaultLayout;
        this.setHeaderLayout(new TextCellLayout());
    }

    setDefaultLayout(defaultLayout: ICellLayout) {
        this._defaultLayout = defaultLayout;
        return this;
    } 

    setHeaderLayout(layout: ICellLayout) {
        return this.setLayout(0, layout);
    }

    setLayout(row: number, layout: ICellLayout) {
        this.layouts[row] = layout;
        return this;
    }

    defaultLayout<T extends ICellLayout>() { return <T>this._defaultLayout; }

    headerLayout() {
        return this.layout(0);
    }

    layoutOrDefault(row: number) {
        return this.layout(row) || this._defaultLayout;
    }

    layout<T extends ICellLayout>(row: number) { return <T>this.layouts[row]; }

    execute(row: number, cellView: GridCellView, column: ODataColumn, record: any) {
        const layout = this.layoutOrDefault(row);
        layout.execute(cellView, column, record)
    }

}