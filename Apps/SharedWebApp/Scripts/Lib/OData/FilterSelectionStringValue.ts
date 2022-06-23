import { FilterField, FilterFieldFunction, FilterValue, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionStringValue implements IFilterSelectionValue {
    constructor(readonly fieldName: string, readonly value: string, readonly ignoreCase: boolean) {
    }


    toField(): FilterField | FilterFieldFunction {
        let field: FilterField | FilterFieldFunction = new FilterField(this.fieldName);
        if (this.ignoreCase) {
            field = FilterFieldFunction.toLower(field);
        }
        return field;
    }

    toValue() {
        return new FilterValue(this.ignoreCase && this.value ? this.value.toLowerCase() : this.value);
    }
}