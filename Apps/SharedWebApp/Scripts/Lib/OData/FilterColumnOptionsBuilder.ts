import { DateRange } from "../DateRange";
import { FilteredArray } from "../Enumerable";
import { NumberRange } from "../NumberRange";
import { RelativeDateRange } from "../RelativeDateRange";
import { FilterSelection, FilterSelectionContains, FilterSelectionEndsWith, FilterSelectionEqual, FilterSelectionGreaterThan, FilterSelectionGreaterThanOrEqual, FilterSelectionIsBlank, FilterSelectionIsFalse, FilterSelectionIsNotBlank, FilterSelectionIsTrue, FilterSelectionLessThan, FilterSelectionLessThanOrEqual, FilterSelectionNotEqual, FilterSelections, FilterSelectionStartsWith, FilterSelectionStringEqual, FilterSelectionStringNotEqual } from "./FilterSelection";
import { ODataColumn } from "./ODataColumn";
import { FilterConditionClause, FilterStringValue, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { SourceType } from "./SourceType";

enum FilterAppend {
    replace,
    append,
    replaceField
}

export class FilterColumnOptionsBuilder {
    private appendValue: FilterAppend = FilterAppend.replace;
    private selection: FilterSelection;
    private _hasAppliedToQuery: boolean;

    constructor(private readonly filter: ODataQueryFilterBuilder, readonly column: ODataColumn) {
    }

    getPotentialConditions(sourceType: SourceType) {
        return new FilteredArray(
            FilterSelections.all,
            c => c.canSelect(sourceType)
        ).value();
    }

    getConditionClauses() { return this.filter.getConditions(); }

    deleteConditionClause(conditionClause: FilterConditionClause) {
        this.filter.remove(conditionClause);
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

    get hasAppliedToQuery() { return this._hasAppliedToQuery; }

    getSelection() { return this.selection; }

    setFilterSelection(selection: FilterSelection) {
        this.selection = selection;
        if (
            selection instanceof FilterSelectionIsTrue ||
            selection instanceof FilterSelectionIsFalse ||
            selection instanceof FilterSelectionIsBlank ||
            selection instanceof FilterSelectionIsNotBlank
        ) {
            this.applyingToQuery();
            selection.applyToQuery(this.filter, this.column.toFilterField());
        }
    }

    setStringValue(value: string, ignoreCase: boolean) {
        if (
            this.selection instanceof FilterSelectionStringEqual ||
            this.selection instanceof FilterSelectionStringNotEqual ||
            this.selection instanceof FilterSelectionStartsWith ||
            this.selection instanceof FilterSelectionEndsWith ||
            this.selection instanceof FilterSelectionContains
        ) {
            this.applyingToQuery();
            this.selection.applyToQuery(
                this.filter,
                this.column.toFilterField(),
                ignoreCase,
                value
            );
        }
    }

    setStringValues(values: string[], ignoreCase: boolean) {
        if (
            this.selection instanceof FilterSelectionStringEqual ||
            this.selection instanceof FilterSelectionStringNotEqual
        ) {
            this.applyingToQuery();
            this.selection.applyToQuery(
                this.filter,
                this.column.toFilterField(),
                ignoreCase,
                values
            );
        }
    }

    setRelativeDateRangeValue(value: RelativeDateRange) {
        this.applyingToQuery();
        FilterSelections.relativeDateRange.applyToQuery(
            this.filter,
            this.column.toFilterField(),
            value
        );
    }

    setAbsoluteDateRangeValue(value: DateRange) {
        this.applyingToQuery();
        FilterSelections.absoluteDateRange.applyToQuery(
            this.filter,
            this.column.toFilterField(),
            value
        );
    }

    setAbsoluteNumberRangeValue(value: NumberRange) {
        this.applyingToQuery();
        FilterSelections.absoluteNumberRange.applyToQuery(
            this.filter,
            this.column.toFilterField(),
            value
        );
    }

    setValues(value: number[] | Date[]) {
        if (
            this.selection instanceof FilterSelectionEqual ||
            this.selection instanceof FilterSelectionNotEqual
        ) {
            this.applyingToQuery();
            this.selection.applyToQuery(
                this.filter,
                this.column.toFilterField(),
                value
            );
        }
    }

    setValue(value: number | Date) {
        if (
            this.selection instanceof FilterSelectionEqual ||
            this.selection instanceof FilterSelectionNotEqual ||
            this.selection instanceof FilterSelectionLessThan ||
            this.selection instanceof FilterSelectionGreaterThan ||
            this.selection instanceof FilterSelectionLessThanOrEqual ||
            this.selection instanceof FilterSelectionGreaterThanOrEqual
        ) {
            this.applyingToQuery();
            this.selection.applyToQuery(
                this.filter,
                this.column.toFilterField(),
                value
            );
        }
    }

    private applyingToQuery() {
        if (this.appendValue === FilterAppend.replace) {
            this.filter.clear();
        }
        this._hasAppliedToQuery = true;
    }
}