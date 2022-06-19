import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { ISerializableQuery } from "./ODataQueryBuilder";
import { ODataColumns } from "./Types";

export class ODataComponentOptions<TEntity> {
    constructor(
        readonly odataGroup: AppApiODataGroup<TEntity>,
        readonly columns: ODataColumns<TEntity>,
        readonly defaultQuery: ISerializableQuery
    ) {
    }
}