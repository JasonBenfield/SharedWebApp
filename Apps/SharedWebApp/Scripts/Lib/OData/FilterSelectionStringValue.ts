import { FilterField, FilterFieldFunction, FilterValue, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionStringValue implements IFilterSelectionValue {
    static blank(fieldName: string) {
        return new FilterSelectionStringValue(fieldName, '', false);
    }

    constructor(readonly fieldName: string, readonly value: string, readonly ignoreCase: boolean) {
    }

    toField() {
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