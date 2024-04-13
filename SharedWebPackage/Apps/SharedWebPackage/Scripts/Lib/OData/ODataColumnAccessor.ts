import { ODataColumn } from "./ODataColumn";
import { IODataColumns } from "./Types";

export class ODataColumnAccessor {
    private readonly _columns: IODataColumns = {};
    private readonly _values: ODataColumn[] = [];

    constructor(startColumns: ODataColumn[], columns: IODataColumns, endColumns: ODataColumn[]) {
        for (const column of startColumns) {
            if (column instanceof ODataColumn) {
                this._columns[column.columnName] = column;
                this._values.push(column);
            }
        }
        for (const key in columns) {
            const column = columns[key];
            if (column instanceof ODataColumn) {
                this._columns[key] = column;
                this._values.push(column);
            }
        }
        for (const column of endColumns) {
            if (column instanceof ODataColumn) {
                this._columns[column.columnName] = column;
                this._values.push(column);
            }
        }
    }

    column(name: string) { return this._columns[name]; }

    columns(includedColumnNames: string[]) {
        return includedColumnNames
            .map(columnName => this.column(columnName))
            .filter(c => Boolean(c));
    }

    values() { return this._values.map(v => v); }

    selectableColumns() {
        return this._values.filter(c => c.canSelect);
    }

    requiredDatabaseColumns() {
        return this._values.filter(c => c.isRequired && !c.sourceType.isNone());
    }
}