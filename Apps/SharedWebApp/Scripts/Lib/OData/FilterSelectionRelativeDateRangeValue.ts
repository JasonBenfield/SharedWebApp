import { RelativeDateRange } from "../RelativeDateRange";
import { ODataColumn } from "./ODataColumn";
import { FilterField, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionRelativeDateRangeValue implements IFilterSelectionValue {
    constructor(readonly column: ODataColumn, readonly value: RelativeDateRange) {
    }

    toField() {
        return new FilterField(this.column.columnName, this.column.displayText);
    }

    toValue() {
        return this.value;
    }

}