import { ISerializableQuery } from "./ODataQueryBuilder";
import { IODataClient, ODataColumns, SaveChangesOptions } from "./Types";

export class ODataComponentOptions<TEntity> {
    constructor(
        readonly id: string,
        readonly odataClient: IODataClient<TEntity>,
        readonly pageSize: number,
        readonly saveChangesOptions: SaveChangesOptions,
        readonly columns: ODataColumns<TEntity>,
        readonly defaultQuery: ISerializableQuery
    ) {
    }
}