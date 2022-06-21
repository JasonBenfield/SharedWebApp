import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataQueryBuilder } from "./ODataQueryBuilder";

export type IODataColumnsBuilder<TEntity> = {
    [K in keyof TEntity]: ODataColumnBuilder;
}

export class ODataComponentOptionsBuilder<TEntity> {
    private odataGroup: AppApiODataGroup<TEntity>;
    private pageSize: number = 50;

    constructor(private readonly columns: IODataColumnsBuilder<TEntity>) {
    }

    setODataGroup(odataGroup: AppApiODataGroup<TEntity>) {
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
        return new ODataComponentOptions(this.odataGroup, this.pageSize, columns, this.query.toSerializable());
    }
}