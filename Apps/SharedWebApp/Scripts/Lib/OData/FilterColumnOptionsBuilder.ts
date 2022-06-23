import { FilterSelection } from "./FilterSelection";
import { FilterSelectionBooleanValue } from "./FilterSelectionBooleanValue";
import { ODataColumn } from "./ODataColumn";
import { ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";

enum FilterAppend {
    replace,
    append,
    replaceField
}

export class FilterColumnOptionsBuilder {
    private appendValue: FilterAppend;
    private selection: FilterSelection;
    private value: any;

    constructor(private readonly filter: ODataQueryFilterBuilder, readonly column: ODataColumn) {
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

    setFilterSelection(selection: FilterSelection) {
        this.selection = selection;
        if (selection === FilterSelection.isTrue) {
            this.value = new FilterSelectionBooleanValue(this.column.columnName, true);
        }
        else if (selection === FilterSelection.isTrue) {
            this.value = new FilterSelectionBooleanValue(this.column.columnName, false);
        }
    }

    applyToQuery() {
        if (this.appendValue === FilterAppend.replace) {
            this.filter.clear();
        }
        this.selection.applyToQuery(this.filter, this.value);
    }
}