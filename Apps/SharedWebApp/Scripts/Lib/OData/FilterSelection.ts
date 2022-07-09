import { DateRange } from "../DateRange";
import { RelativeDateRange } from "../RelativeDateRange";
import { FilterAbsoluteDateRange, FilterConditionFunction, FilterConditionOperation, FilterField, FilterFieldFunction, FilterRelativeDateRange, FilterValue, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { SourceType } from "./SourceType";

export interface FilterSelection {
    readonly displayText: string;
    canSelect(sourceType: SourceType);
}

export class FilterSelectionEqual implements FilterSelection {
    readonly displayText = 'Equal To'

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField | FilterFieldFunction,
        value: number | Date
    ) {
        filter.add(FilterConditionOperation.equal(field, new FilterValue(value)));
    }
}

export class FilterSelectionNotEqual implements FilterSelection {
    readonly displayText = 'Not Equal To';

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField | FilterFieldFunction,
        value: number | Date
    ) {
        filter.add(FilterConditionOperation.notEqual(field, new FilterValue(value)));
    }
}

export class FilterSelectionGreaterThan implements FilterSelection {
    readonly displayText = 'Greater Than';

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField | FilterFieldFunction,
        value: number | Date
    ) {
        filter.add(FilterConditionOperation.greaterThan(field, new FilterValue(value)));
    }
}

export class FilterSelectionLessThan implements FilterSelection {
    readonly displayText = 'Less Than';

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField | FilterFieldFunction,
        value: number | Date
    ) {
        filter.add(FilterConditionOperation.lessThan(field, new FilterValue(value)));
    }
}

export class FilterSelectionGreaterThanOrEqual implements FilterSelection {
    readonly displayText = 'Greater Than or Equal To';

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField | FilterFieldFunction,
        value: number | Date
    ) {
        filter.add(FilterConditionOperation.greaterThanOrEqual(field, new FilterValue(value)));
    }
}

export class FilterSelectionLessThanOrEqual implements FilterSelection {
    readonly displayText = 'Less Than or Equal To';

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField,
        value: number | Date
    ) {
        filter.add(FilterConditionOperation.lessThanOrEqual(field, new FilterValue(value)));
    }
}

export class FilterSelectionIsTrue implements FilterSelection {
    readonly displayText = 'Is True';

    canSelect(sourceType: SourceType) {
        return sourceType.isBoolean();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField
    ) {
        filter.add(FilterConditionOperation.equal(field, new FilterValue(true)));
    }
}

export class FilterSelectionIsFalse implements FilterSelection {
    readonly displayText = 'Is False';

    canSelect(sourceType: SourceType) {
        return sourceType.isBoolean();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField
    ) {
        filter.add(FilterConditionOperation.equal(field, new FilterValue(false)));
    }
}

function getStringField(
    field: FilterField,
    ignoreCase: boolean
) {
    return ignoreCase
        ? FilterFieldFunction.toLower(field)
        : field;
}

function getStringValue(
    value: string,
    ignoreCase: boolean
) {
    return ignoreCase && value ? value.toLowerCase() : value;
}

export class FilterSelectionStringEqual implements FilterSelection {
    readonly displayText = 'Equal To';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField,
        ignoreCase: boolean,
        value: string
    ) {
        filter.add(
            FilterConditionOperation.equal(
                getStringField(field, ignoreCase),
                new FilterValue(getStringValue(value, ignoreCase))
            )
        );
    }
}

export class FilterSelectionStringNotEqual implements FilterSelection {
    readonly displayText = 'Not Equal To';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField,
        ignoreCase: boolean,
        value: string
    ) {
        filter.add(
            FilterConditionOperation.notEqual(
                getStringField(field, ignoreCase),
                new FilterValue(getStringValue(value, ignoreCase))
            )
        );
    }
}

export class FilterSelectionStartsWith implements FilterSelection {
    readonly displayText = 'Starts With';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField,
        ignoreCase: boolean,
        value: string
    ) {
        filter.add(
            FilterConditionFunction.startsWith(
                getStringField(field, ignoreCase),
                new FilterValue(getStringValue(value, ignoreCase))
            )
        );
    }
}

export class FilterSelectionEndsWith implements FilterSelection {
    readonly displayText = 'Ends With';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField,
        ignoreCase: boolean,
        value: string
    ) {
        filter.add(
            FilterConditionFunction.endsWith(
                getStringField(field, ignoreCase),
                new FilterValue(getStringValue(value, ignoreCase))
            )
        );
    }
}

export class FilterSelectionContains implements FilterSelection {
    readonly displayText = 'Contains';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(
        filter: ODataQueryFilterBuilder,
        field: FilterField,
        ignoreCase: boolean,
        value: string
    ) {
        filter.add(
            FilterConditionFunction.contains(
                getStringField(field, ignoreCase),
                new FilterValue(getStringValue(value, ignoreCase))
            )
        );
    }
}

export class FilterSelectionIsBlank implements FilterSelection {
    readonly displayText = 'Is Blank';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, field: FilterField) {
        filter.add(FilterConditionOperation.equal(field, new FilterValue('')));
    }
}

export class FilterSelectionIsNotBlank implements FilterSelection {
    readonly displayText = 'Is Not Blank';

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, field: FilterField) {
        filter.add(FilterConditionOperation.notEqual(field, new FilterValue('')));
    }
}

export class FilterSelectionRelativeDateRange implements FilterSelection {
    readonly displayText = 'Relative Date Range';

    canSelect(sourceType: SourceType) {
        return sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, field: FilterField, value: RelativeDateRange) {
        filter.add(new FilterRelativeDateRange(field, value));
    }
}

export class FilterSelectionAbsoluteDateRange implements FilterSelection {
    readonly displayText = 'Absolute Date Range';

    canSelect(sourceType: SourceType) {
        return sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, field: FilterField, value: DateRange) {
        filter.add(new FilterAbsoluteDateRange(field, value));
    }
}

export class FilterSelections {
    static readonly equal = new FilterSelectionEqual();
    static readonly notEqual = new FilterSelectionNotEqual();
    static readonly greaterThan = new FilterSelectionGreaterThan();
    static readonly lessThan = new FilterSelectionLessThan();
    static readonly greaterThanOrEqual = new FilterSelectionGreaterThanOrEqual();
    static readonly lessThanOrEqual = new FilterSelectionLessThanOrEqual();
    static readonly isTrue = new FilterSelectionIsTrue();
    static readonly isFalse = new FilterSelectionIsFalse();
    static readonly stringEqual = new FilterSelectionStringEqual();
    static readonly stringNotEqual = new FilterSelectionStringNotEqual();
    static readonly startsWith = new FilterSelectionStartsWith();
    static readonly endsWith = new FilterSelectionEndsWith();
    static readonly contains = new FilterSelectionContains();
    static readonly isBlank = new FilterSelectionIsBlank();
    static readonly isNotBlank = new FilterSelectionIsNotBlank();
    static readonly relativeDateRange = new FilterSelectionRelativeDateRange();
    static readonly absoluteDateRange = new FilterSelectionAbsoluteDateRange();

    static readonly all = [
        FilterSelections.equal,
        FilterSelections.notEqual,
        FilterSelections.greaterThan,
        FilterSelections.lessThan,
        FilterSelections.greaterThanOrEqual,
        FilterSelections.lessThanOrEqual,
        FilterSelections.isTrue,
        FilterSelections.isFalse,
        FilterSelections.stringEqual,
        FilterSelections.stringNotEqual,
        FilterSelections.startsWith,
        FilterSelections.endsWith,
        FilterSelections.contains,
        FilterSelections.isBlank,
        FilterSelections.isNotBlank,
        FilterSelections.relativeDateRange,
        FilterSelections.absoluteDateRange
    ];
}