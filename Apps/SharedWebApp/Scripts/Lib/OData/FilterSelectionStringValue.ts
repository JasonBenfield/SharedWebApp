import { ODataColumn } from "./ODataColumn";
import { FilterField, FilterFieldFunction, FilterValue, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionStringValue implements IFilterSelectionValue {
    static blank(column: ODataColumn) {
        return new FilterSelectionStringValue(column, '', false);
    }

    constructor(readonly column: ODataColumn, readonly value: string, readonly ignoreCase: boolean) {
    }

    toField() {
        let field: FilterField | FilterFieldFunction =
            new FilterField(this.column.columnName, this.column.displayText);
        if (this.ignoreCase) {
            field = FilterFieldFunction.toLower(field);
        }
        return field;
    }

    toValue() {
        return new FilterValue(this.ignoreCase && this.value ? this.value.toLowerCase() : this.value);
    }
}