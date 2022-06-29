import { RelativeDateRange } from "../RelativeDateRange";
import { FilterField, IFilterSelectionValue } from "./ODataQueryFilterBuilder";

export class FilterSelectionRelativeDateRangeValue implements IFilterSelectionValue {
    constructor(readonly fieldName: string, readonly value: RelativeDateRange) {
    }

    toField() {
        return new FilterField(this.fieldName);
    }

    toValue() {
        return this.value;
    }

}