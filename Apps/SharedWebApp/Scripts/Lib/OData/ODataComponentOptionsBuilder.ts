import { AppApiODataGroup } from "../Api/AppApiODataGroup";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";

export type IODataColumnsBuilder<TEntity> = {
    [K in keyof TEntity]: ODataColumnBuilder;
}

export class ODataComponentOptionsBuilder<TEntity> {
    private odataGroup: AppApiODataGroup<TEntity>;

    constructor(private readonly columns: IODataColumnsBuilder<TEntity>) {
    }

    setODataGroup(odataGroup: AppApiODataGroup<TEntity>) {
        this.odataGroup = odataGroup;
    }

    build() {
        let columns: any = {};
        for (let key in this.columns) {
            let column = this.columns[key];
            if (column instanceof ODataColumnBuilder) {
                columns[key] = column.build();
            }
        }
        return new ODataComponentOptions(this.odataGroup, columns);
    }
}