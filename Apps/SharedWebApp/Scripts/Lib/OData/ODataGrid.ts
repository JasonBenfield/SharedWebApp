import { MappedArray } from "../Enumerable";
import { ODataGridView } from "./ODataGridView";
import { IODataColumns, IQueryable } from "./Types";


export class ODataGrid<TEntity> {
    constructor(private readonly columns: IODataColumns<TEntity>, private readonly view: ODataGridView) {
    }

    setData(columnNames: (keyof TEntity)[], records: IQueryable<TEntity>[]) {
        const templateColumns = new MappedArray(
            columnNames,
            name => this.columns[name].width
        ).value();
        this.view.setTemplateColumns(...templateColumns);
        const headerRow = this.view.addHeaderRow(columnNames.length);
        for (let i = 0; i < columnNames.length; i++) {
            const cell = headerRow.cell(i);
            const columnName = columnNames[i];
            const column = this.columns[columnName];
            column.headerCellLayout.execute(cell, columnName);
        }
        for (const record of records) {
            const dataRow = this.view.addRow(columnNames.length);
            for (let i = 0; i < columnNames.length; i++) {
                const cell = dataRow.cell(i);
                const columnName = <string>columnNames[i];
                const column = this.columns[columnName];
                column.dataCellLayout.execute(cell, record[columnName]);
            }
        }
    }
}