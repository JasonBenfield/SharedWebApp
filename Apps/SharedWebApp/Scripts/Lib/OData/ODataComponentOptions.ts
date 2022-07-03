import { AppApiQuery } from "../Api/AppApiQuery";
import { ISerializableQuery } from "./ODataQueryBuilder";
import { ODataColumns } from "./Types";

export class ODataComponentOptions<TEntity> {
    constructor(
        readonly odataGroup: AppApiQuery<TEntity>,
        readonly pageSize: number,
        readonly columns: ODataColumns<TEntity>,
        readonly defaultQuery: ISerializableQuery
    ) {
    }
}