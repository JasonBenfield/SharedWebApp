import { MappedArray } from "../Enumerable";
import { DefaultEvent } from "../Events";
import { GridCellView } from "../Html/GridCellView";
import { ODataCellClickedEventArgs } from "./ODataCellClickedEventArgs";
import { ODataGridView } from "./ODataGridView";
import { ODataRow } from "./ODataRow";
import { IODataColumns, Queryable } from "./Types";

export class ODataGrid<TEntity> {
    private readonly rows: ODataRow[] = [];

    private readonly _cellClicked = new DefaultEvent<ODataCellClickedEventArgs>(this);
    readonly cellClicked = this._cellClicked.handler();

    constructor(
        private readonly columns: IODataColumns,
        private readonly view: ODataGridView
    ) {
        view.events.onClick(
            this.onClick.bind(this),
            options => options.select('.grid-cell')
        );
    }

    private onClick(cellView: GridCellView) {
        const cell = this.cellByView(cellView);
        if (cell) {
            this._cellClicked.invoke(cell);
        }
    }

    private cellByView(view: GridCellView) {
        for (const row of this.rows) {
            const testCell = row.cellByView(view);
            if (testCell) {
                return testCell;
            }
        }
        return null;
    }

    setData(selectedColumnNames: string[], records: Queryable<TEntity>[]) {
        this.rows.splice(0, this.rows.length);
        const columnViews = new MappedArray(
            selectedColumnNames,
            name => this.columns[name].view
        ).value();
        this.view.setSelectedTemplateColumns(columnViews);
        const columns = new MappedArray(
            selectedColumnNames,
            name => this.columns[name]
        ).value();
        const headerRowView = this.view.addHeaderRow(selectedColumnNames.length);
        const headerRow = new ODataRow(0, columns, null, headerRowView);
        this.rows.push(headerRow);
        let rowIndex = 1;
        for (const record of records) {
            const dataRowView = this.view.addRow(selectedColumnNames.length);
            const dataRow = new ODataRow(rowIndex, columns, record, dataRowView);
            this.rows.push(dataRow);
            rowIndex++;
        }
    }
}