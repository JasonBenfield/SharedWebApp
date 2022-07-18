import { MappedArray } from "../Enumerable";
import { GridRowView } from "../Views/Grid";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { ODataRow } from "./ODataRow";
import { SourceType } from "./SourceType";
import { IODataClient, SaveChangesOptions } from "./Types";

export type IODataColumnsBuilder<TEntity> = {
    [K in keyof TEntity]: ODataColumnBuilder;
}

export class ODataFixedColumnsBuilder {
    private readonly columns: ODataColumnBuilder[] = [];

    add(columnName: string, view: ODataColumnViewBuilder) {
        const column = new ODataColumnBuilder(columnName, SourceType.none, view);
        column.disableMove();
        this.columns.push(column);
        return column;
    }

    build() {
        return new MappedArray(
            this.columns,
            c => c.build()
        ).value();
    }
}

export class ODataComponentOptionsBuilder<TEntity> {
    private createDataRow: (rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) => ODataRow =
        (rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) => new ODataRow(rowIndex, columns, record, view);
    private odataClient: IODataClient<TEntity>;
    private pageSize: number = 50;
    readonly query = new ODataQueryBuilder();
    private saveChangesOptions: SaveChangesOptions = { select: false, filter: false, orderby: false };
    readonly startColumns: ODataFixedColumnsBuilder;
    readonly endColumns: ODataFixedColumnsBuilder;

    constructor(
        private readonly id: string,
        private readonly columns: IODataColumnsBuilder<TEntity>
    ) {
        this.startColumns = new ODataFixedColumnsBuilder();
        this.endColumns = new ODataFixedColumnsBuilder();
    }

    setCreateDataRow(createDataRow: (rowIndex: number, columns: ODataColumn[], record: any, view: GridRowView) => ODataRow) {
        this.createDataRow = createDataRow;
        return this;
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
        const columns: any = {};
        for (const key in this.columns) {
            const column = this.columns[key];
            if (column instanceof ODataColumnBuilder) {
                columns[key] = column.build();
            }
        }
        return new ODataComponentOptions(
            this.id,
            this.createDataRow,
            this.odataClient,
            this.pageSize,
            this.saveChangesOptions,
            this.startColumns.build(),
            columns,
            this.endColumns.build(),
            this.query.serialize()
        );
    }
}