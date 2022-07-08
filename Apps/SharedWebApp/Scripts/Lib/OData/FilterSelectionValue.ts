import { ODataColumn } from "./ODataColumn";
import { FilterField, FilterValue, FilterValueType } from "./ODataQueryFilterBuilder";

export class FilterSelectionValue {
    constructor(readonly column: ODataColumn, readonly value: FilterValueType) {
    }

    toField() {
        return new FilterField(this.column.columnName, this.column.displayText);
    }

    toValue() {
        return new FilterValue(this.value);
    }
}