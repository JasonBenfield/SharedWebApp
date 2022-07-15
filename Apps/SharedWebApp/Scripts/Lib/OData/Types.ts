import { ODataResult } from "../Api/ODataResult"
import { GridCellView } from "../Views/Grid"
import { ODataCell } from "./ODataCell"
import { ODataColumn } from "./ODataColumn"

export type Queryable<TEntity> = {
    [K in keyof TEntity]?: TEntity[K];
}

export type ODataColumns<TEntity> = {
    [K in keyof TEntity]: ODataColumn;
}

export interface IValueFormatter {
    format(column: ODataColumn, record?: any): string;
}

export interface IODataColumns {
    [name: string]: ODataColumn;
}

export type ICreateHeaderCell = (column: ODataColumn, view: GridCellView) => ODataCell;

export type ICreateDataCell =
    (rowIndex: number, column: ODataColumn, record: any, formatter: IValueFormatter, view: GridCellView) => ODataCell;

export interface SaveChangesOptions {
    readonly select: boolean;
    readonly filter: boolean;
    readonly orderby: boolean;
}

export interface IODataClient<TEntity> {
    toExcel(odataQuery: string);
    execute(odataQuery: string): Promise<ODataResult<TEntity>>;
}
