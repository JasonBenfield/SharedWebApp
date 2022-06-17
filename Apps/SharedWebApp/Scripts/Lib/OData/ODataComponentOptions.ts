import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { IODataColumns } from "./Types";

export class ODataComponentOptions<TEntity> {
    constructor(
        readonly odataGroup: AppApiODataGroup<TEntity>,
        readonly columns: IODataColumns<TEntity>
    ) {
    }
}