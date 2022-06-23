import { FilterField, FilterValue, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionBooleanValue implements IFilterSelectionValue {
    constructor(private readonly fieldName, private readonly value: boolean) {
    }

    toField() {
        return new FilterField(this.fieldName);
    }

    toValue() {
        return new FilterValue(this.value);
    }

}