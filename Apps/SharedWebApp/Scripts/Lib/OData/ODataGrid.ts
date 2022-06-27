import { MappedArray } from "../Enumerable";
import { DefaultEvent, EventCollection } from "../Events";
import { ODataCellClickedEventArgs } from "./ODataCellClickedEventArgs";
import { ODataColumn } from "./ODataColumn";
import { ODataGridView } from "./ODataGridView";
import { ODataHeaderRow } from "./ODataHeaderRow";
import { ODataQueryOrderByBuilder } from "./ODataQueryBuilder";
import { ODataRow } from "./ODataRow";
import { IODataRow, Queryable } from "./Types";

export class ODataGrid<TEntity> {
    private readonly rows: IODataRow[] = [];

    private readonly _cellClicked = new DefaultEvent<ODataCellClickedEventArgs>(this);
    readonly cellClicked = this._cellClicked.handler();

    private readonly _sortClicked = new DefaultEvent<ODataColumn>(this);
    readonly sortClicked = this._sortClicked.handler();

    private readonly events = new EventCollection();

    constructor(private readonly view: ODataGridView) {
    }


    orderByChanged(orderBy: ODataQueryOrderByBuilder) {
        const headerRowView = this.rows[0] as ODataHeaderRow;
        headerRowView.setOrderBy(orderBy);
    }

    setData(columns: ODataColumn[], records: Queryable<TEntity>[]) {
        this.events.unregisterAll();
        this.view.clearContents();
        this.rows.splice(0, this.rows.length);
        const columnViews = new MappedArray(
            columns,
            column => column.view
        ).value();
        this.view.setSelectedTemplateColumns(columnViews);
        const headerRowView = this.view.addHeaderRow(columnViews);
        const headerRow = new ODataHeaderRow(columns, headerRowView);
        headerRow.when.sortClicked.then(this.onSortClicked.bind(this));
        this.rows.push(headerRow);
        let rowIndex = 1;
        for (const record of records) {
            const dataRowView = this.view.addDataRow(columnViews);
            const dataRow = new ODataRow(rowIndex, columns, record, dataRowView);
            this.rows.push(dataRow);
            rowIndex++;
        }
    }

    private onSortClicked(column: ODataColumn) {
        this._sortClicked.invoke(column);
    }
}