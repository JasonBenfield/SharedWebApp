import { RelativeDateRange } from "../RelativeDateRange";
import { FilterSelection } from "./FilterSelection";
import { FilterSelectionBooleanValue } from "./FilterSelectionBooleanValue";
import { FilterSelectionRelativeDateRangeValue } from "./FilterSelectionRelativeDateRangeValue";
import { FilterSelectionStringValue } from "./FilterSelectionStringValue";
import { FilterSelectionValue } from "./FilterSelectionValue";
import { ODataColumn } from "./ODataColumn";
import { FilterField, FilterValue, IFilterSelectionValue, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";

enum FilterAppend {
    replace,
    append,
    replaceField
}

export class FilterColumnOptionsBuilder {
    private appendValue: FilterAppend = FilterAppend.replace;
    private selection: FilterSelection;
    private value: IFilterSelectionValue;

    constructor(private readonly filter: ODataQueryFilterBuilder, readonly column: ODataColumn) {
    }

    getConditionQueries() { return this.filter.conditionQueries(); }

    append() {
        this.appendValue = FilterAppend.append;
    }

    replace() {
        this.appendValue = FilterAppend.replace;
    }

    replaceField() {
        this.appendValue = FilterAppend.replaceField;
    }

    getSelection() { return this.selection; }

    setFilterSelection(selection: FilterSelection) {
        this.selection = selection;
        if (selection === FilterSelection.isTrue) {
            this.value = new FilterSelectionBooleanValue(this.column.columnName, true);
        }
        else if (selection === FilterSelection.isTrue) {
            this.value = new FilterSelectionBooleanValue(this.column.columnName, false);
        }
        else if (selection === FilterSelection.isBlank || selection === FilterSelection.isNotBlank) {
            this.value = FilterSelectionStringValue.blank(this.column.columnName);
        }
    }

    setStringValue(value: any, ignoreCase) {
        this.value = new FilterSelectionStringValue(this.column.columnName, value, ignoreCase);
    }

    setRelativeDateRangeValue(value: RelativeDateRange) {
        this.value = new FilterSelectionRelativeDateRangeValue(this.column.columnName, value);
    }

    setValue(value: number | Date) {
        this.value = new FilterSelectionValue(this.column.columnName, value);
    }

    applyToQuery() {
        if (this.appendValue === FilterAppend.replace) {
            this.filter.clear();
        }
        this.selection.applyToQuery(this.filter, this.value);
    }
}