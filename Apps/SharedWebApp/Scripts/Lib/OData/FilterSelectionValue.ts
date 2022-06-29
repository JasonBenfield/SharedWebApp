import { FilterField, FilterValue, FilterValueType } from "./ODataQueryFilterBuilder";

export class FilterSelectionValue {
    constructor(readonly fieldName: string, readonly value: FilterValueType) {
    }

    toField() {
        return new FilterField(this.fieldName);
    }

    toValue() {
        return new FilterValue(this.value);
    }
}