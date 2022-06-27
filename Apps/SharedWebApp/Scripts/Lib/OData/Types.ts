import { ContextualClass } from "../ContextualClass"
import { CssClass } from "../CssClass"
import { TextCss } from "../TextCss"
import { GridCellView } from "../Views/Grid"
import { ODataCell } from "./ODataCell"
import { ODataColumn } from "./ODataColumn"
import { ODataColumnView } from "./ODataColumnView"

export type Queryable<TEntity> = {
    [K in keyof TEntity]?: TEntity[K];
}

export type ODataColumns<TEntity> = {
    [K in keyof TEntity]: ODataColumn;
}

export interface ICellLayout {
    execute(cellView: GridCellView, column: ODataColumn, record?: any);
}

export interface IValueFormatter {
    format(column: ODataColumn, record?: any): string;
}

export interface IODataColumns {
    [name: string]: ODataColumn;
}

export interface IODataColumnViews {
    [name: string]: ODataColumnView;
}

export type ICreateHeaderCell = (column: ODataColumn, view: GridCellView) => ODataCell;

export type ICreateDataCell =
    (rowIndex: number, column: ODataColumn, record: any, formatter: IValueFormatter, view: GridCellView) => ODataCell;

export interface ICellStyle {
    textCss?: TextCss;
    backgroundContext?: ContextualClass;
    cssClass?: CssClass;
}

export interface IODataRow {
}
