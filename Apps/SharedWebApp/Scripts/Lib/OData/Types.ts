import { GridCellView } from "../Html/GridCellView"
import { ODataColumn } from "./ODataColumn"

export type IQueryable<TEntity> = {
    [K in keyof TEntity]?: TEntity[K];
}

export type IODataColumns<TEntity> = {
    [K in keyof TEntity]: ODataColumn;
}

export interface ICellLayout {
    execute(cellView: GridCellView, value: any);
}