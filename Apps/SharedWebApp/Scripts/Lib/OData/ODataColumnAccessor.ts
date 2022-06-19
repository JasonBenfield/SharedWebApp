import { filter } from "lodash";
import { EnumerableArray, FilteredArray, MappedArray } from "../Enumerable";
import { ODataColumn } from "./ODataColumn";
import { IODataColumns } from "./Types";

export class ODataColumnAccessor {
    private readonly _columns: IODataColumns = {};
    private readonly _values: ODataColumn[] = [];

    constructor(columns: IODataColumns) {
        for (const key in columns) {
            const column = columns[key];
            if (column instanceof ODataColumn) {
                this._columns[key] = column;
                this._values.push(column);
            }
        }
    }

    column(name: string) { return this._columns[name]; }

    columns(includedColumnNames: string[]) {
        return new MappedArray(
            includedColumnNames,
            columnName => this.column(columnName)
        ).value();
    }

    values() { return new EnumerableArray(this._values).value(); }

    visibleSelectableColumns() {
        return new FilteredArray(
            this._values,
            c => c.isVisible && c.isSelectable
        ).value();
    }

    requiredSelectableColumns() {
        return new FilteredArray(
            this._values,
            c => c.isRequired && c.isSelectable
        ).value();
    }
}