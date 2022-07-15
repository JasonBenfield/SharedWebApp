import { AppApiQuery } from "../Api/AppApiQuery";
import { ODataResult } from "../Api/ODataResult";
import { IODataClient } from "./Types";

export class ApiODataClient<TArgs, TEntity> implements IODataClient<TEntity> {
    private readonly odataApi: AppApiQuery<TArgs, TEntity>;
    private model: TArgs;

    constructor(odataApi: AppApiQuery<TArgs, TEntity>, model: TArgs) {
        this.odataApi = odataApi;
        this.model = model;
    }

    setArgs(model: TArgs) {
        this.model = model;
    }

    toExcel(odataQuery: string) {
        this.odataApi.toExcel(odataQuery, this.model);
    }

    execute(odataQuery: string): Promise<ODataResult<TEntity>> {
        return this.odataApi.execute(odataQuery, this.model, { preventDefault: true });
    }

}