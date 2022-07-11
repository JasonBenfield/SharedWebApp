import { AppApiQuery } from "../Api/AppApiQuery";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataQueryBuilder } from "./ODataQueryBuilder";

export type IODataColumnsBuilder<TEntity> = {
    [K in keyof TEntity]: ODataColumnBuilder;
}

export class ODataComponentOptionsBuilder<TEntity> {
    private odataGroup: AppApiQuery<TEntity>;
    private pageSize: number = 50;

    constructor(
        private readonly id: string,
        private readonly columns: IODataColumnsBuilder<TEntity>
    ) {
    }

    setODataGroup(odataGroup: AppApiQuery<TEntity>) {
        this.odataGroup = odataGroup;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    readonly query = new ODataQueryBuilder();

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
            this.odataGroup,
            this.pageSize,
            columns,
            this.query.serialize()
        );
    }
}