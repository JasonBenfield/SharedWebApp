import { ContextualClass } from "../ContextualClass"
import { CssClass } from "../CssClass"
import { GridCellView } from "../Html/GridCellView"
import { TextCss } from "../TextCss"
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

export interface ITextCellFormatter {
    format(column: ODataColumn, record?: any): string;
}

export interface IODataColumns {
    [name: string]: ODataColumn;
}

export interface IODataColumnViews {
    [name: string]: ODataColumnView;
}