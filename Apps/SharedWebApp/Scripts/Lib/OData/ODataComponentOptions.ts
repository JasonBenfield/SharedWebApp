import { AppApiQuery } from "../Api/AppApiQuery";
import { ISerializableQuery } from "./ODataQueryBuilder";
import { ODataColumns, SaveChangesOptions } from "./Types";

export class ODataComponentOptions<TEntity> {
    constructor(
        readonly id: string,
        readonly odataGroup: AppApiQuery<TEntity>,
        readonly pageSize: number,
        readonly saveChangesOptions: SaveChangesOptions,
        readonly columns: ODataColumns<TEntity>,
        readonly defaultQuery: ISerializableQuery
    ) {
    }
}