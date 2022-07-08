import { ODataColumn } from "./ODataColumn";
import { FilterField, FilterValue, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionBooleanValue implements IFilterSelectionValue {
    constructor(private readonly column: ODataColumn, private readonly value: boolean) {
    }

    toField() {
        return new FilterField(this.column.columnName, this.column.displayText);
    }

    toValue() {
        return new FilterValue(this.value);
    }

}