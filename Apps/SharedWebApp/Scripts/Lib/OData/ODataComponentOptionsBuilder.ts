import { GridRowView } from "../Views/Grid";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ODataColumnViewBuilder } from "./ODataColumnViewBuilder";
import { ODataComponentOptions } from "./ODataComponentOptions";
import { ODataQueryBuilder } from "./ODataQueryBuilder";
import { ODataRow } from "./ODataRow";
import { SourceType } from "./SourceType";
import { SuggestedValueListGetter } from "./SuggestedValueListGetter";
import { SuggestedValueODataGetter } from "./SuggestedValueODataGetter";
import { IODataClient, SaveChangesOptions } from "./Types";

export type IODataColumnsBuilder<TEntity> = {
    [K in keyof TEntity]: ODataColumnBuilder;
}

export class ODataFixedColumnsBuilder {
    private readonly columns: ODataColumnBuilder[] = [];

    add(columnName: string, view: ODataColumnViewBuilder) {
        const column = new ODataColumnBuilder(columnName, SourceType.none, view);
        column.disableMove();
        column.disableSelect();
        this.columns.push(column);
        return column;
    }

    build() {
        return this.columns.map(c => c.build());
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
    private canSelectColumns = true;
    private canFilter = true;
    private canSort = true;

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
        return this;
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        return this;
    }

    saveChanges(options: SaveChangesOptions = { select: true, filter: true, orderby: true }) {
        this.saveChangesOptions = options;
        return this;
    }

    disableSelectColumns() {
        this.canSelectColumns = false;
        return this;
    }

    disableFilter() {
        this.canFilter = false;
        return this;
    }

    disableSort() {
        this.canSort = false;
        return this;
    }

    build() {
        const columns: any = {};
        const startColumns = this.startColumns.build();
        for (const key in this.columns) {
            const column = this.columns[key];
            if (column instanceof ODataColumnBuilder) {
                if (!this.canSelectColumns) {
                    column.disableSelect();
                }
                if (!this.canSort) {
                    column.disableSort();
                }
                if (!column.hasSuggestedValueGetter()) {
                    if (column.sourceType.isString()) {
                        column.setSuggestedValueGetter(
                            new SuggestedValueODataGetter(this.odataClient, column.columnName)
                        );
                    }
                    else {
                        column.setSuggestedValueGetter(new SuggestedValueListGetter([]));
                    }
                }
                columns[key] = column.build();
            }
        }
        const endColumns = this.endColumns.build();
        return new ODataComponentOptions(
            this.id,
            this.createDataRow,
            this.odataClient,
            this.pageSize,
            this.saveChangesOptions,
            startColumns,
            columns,
            endColumns,
            this.query.serialize(),
            this.canSelectColumns,
            this.canFilter,
            this.canSort
        );
    }
}