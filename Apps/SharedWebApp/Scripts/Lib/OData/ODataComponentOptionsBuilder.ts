import { AppApiQuery } from "../Api/AppApiQuery";
import { ApiODataClient } from "./ApiODataClient";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { IODataClient, SaveChangesOptions } from "./Types";

export type IODataColumnsBuilder<TEntity> = {
    [K in keyof TEntity]: ODataColumnBuilder;
}

export class ODataComponentOptionsBuilder<TEntity> {
    private odataClient: IODataClient<TEntity>;
    private pageSize: number = 50;
    readonly query = new ODataQueryBuilder();
    private saveChangesOptions: SaveChangesOptions = { select: false, filter: false, orderby: false };

    constructor(
        private readonly id: string,
        private readonly columns: IODataColumnsBuilder<TEntity>
    ) {
    }

    setODataClient(odataClient: IODataClient<TEntity>) {
        this.odataClient = odataClient;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    saveChanges(options: SaveChangesOptions = { select: true, filter: true, orderby: true }) {
        this.saveChangesOptions = options;
    }

    build() {
        let columns: any = {};
        for (let key in this.columns) {
            let column = this.columns[key];
            if (column instanceof ODataColumnBuilder) {
                columns[key] = column.build();
            }
        }
        return new ODataComponentOptions(
            this.id,
            this.odataClient,
            this.pageSize,
            this.saveChangesOptions,
            columns,
            this.query.serialize()
        );
    }
}