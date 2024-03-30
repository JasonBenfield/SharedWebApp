import { AppClientQuery } from "../Http/AppClientQuery";
import { ODataResult } from "../Http/ODataResult";
import { IODataClient } from "./Types";

export class DefaultODataClient<TArgs, TEntity> implements IODataClient<TEntity> {
    constructor(
        private readonly clientQuery: AppClientQuery<TArgs, TEntity>,
        private readonly queryArgs: { args: TArgs }
    ) {
    }
    
    toExcel(odataQuery: string) {
        this.clientQuery.toExcel(odataQuery, this.queryArgs.args);
    }

    execute(odataQuery: string): Promise<ODataResult<TEntity>> {
        return this.clientQuery.execute(odataQuery, this.queryArgs.args, { preventDefault: true });
    }

}