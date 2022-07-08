import { RelativeDateRange } from "../RelativeDateRange";
import { FilterSelection } from "./FilterSelection";
import { FilterSelectionBooleanValue } from "./FilterSelectionBooleanValue";
import { FilterSelectionRelativeDateRangeValue } from "./FilterSelectionRelativeDateRangeValue";
import { FilterSelectionStringValue } from "./FilterSelectionStringValue";
import { FilterSelectionValue } from "./FilterSelectionValue";
import { ODataColumn } from "./ODataColumn";
import { FilterConditionClause, IFilterSelectionValue, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";

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

    getConditionClauses() { return this.filter.getConditions(); }

    deleteConditionClause(conditionClause: FilterConditionClause) {
        this.filter.deleteCondition(conditionClause);
    }

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
            this.value = new FilterSelectionBooleanValue(this.column, true);
        }
        else if (selection === FilterSelection.isTrue) {
            this.value = new FilterSelectionBooleanValue(this.column, false);
        }
        else if (selection === FilterSelection.isBlank || selection === FilterSelection.isNotBlank) {
            this.value = FilterSelectionStringValue.blank(this.column);
        }
    }

    setStringValue(value: any, ignoreCase) {
        this.value = new FilterSelectionStringValue(this.column, value, ignoreCase);
    }

    setRelativeDateRangeValue(value: RelativeDateRange) {
        this.value = new FilterSelectionRelativeDateRangeValue(this.column, value);
    }

    setValue(value: number | Date) {
        this.value = new FilterSelectionValue(this.column, value);
    }

    applyToQuery() {
        if (this.appendValue === FilterAppend.replace) {
            this.filter.clear();
        }
        this.selection.applyToQuery(this.filter, this.value);
    }
}