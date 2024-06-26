﻿import { BasicGridRowView } from "../Views/Grid";
import { ODataColumn } from "./ODataColumn";
import { ISerializableQuery } from "./ODataQueryBuilder";
import { ODataRow } from "./ODataRow";
import { IODataClient, ODataColumns, Queryable, SaveChangesOptions } from "./Types";

export class ODataComponentOptions<TEntity> {
    constructor(
        readonly id: string,
        readonly createDataRow: (rowIndex: number, columns: ODataColumn[], record: Queryable<TEntity>, view: BasicGridRowView) => ODataRow,
        readonly odataClient: IODataClient<TEntity>,
        readonly pageSize: number,
        readonly saveChangesOptions: SaveChangesOptions,
        readonly startColumns: ODataColumn[],
        readonly columns: ODataColumns<TEntity>,
        readonly endColumns: ODataColumn[],
        readonly defaultQuery: ISerializableQuery,
        readonly canSelectColumns: boolean,
        readonly canFilter: boolean,
        readonly canSort: boolean
    ) {
    }
}