﻿import { MappedArray } from "../Enumerable";
import { FilterSelectionRelativeDateRangeValue } from "./FilterSelectionRelativeDateRangeValue";
import { FilterSelectionStringValue } from "./FilterSelectionStringValue";
import { FilterSelectionValue } from "./FilterSelectionValue";
import { FilterConditionFunction, FilterConditionOperation, FilterRelativeDateRange, IFilterSelectionValue, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { SourceType } from "./SourceType";

export abstract class FilterSelection {
    private static readonly selections = {
        equal: null as FilterSelection,
        notEqual: null as FilterSelection,
        greaterThan: null as FilterSelection,
        lessThan: null as FilterSelection,
        greaterThanOrEqual: null as FilterSelection,
        lessThanOrEqual: null as FilterSelection,
        isTrue: null as FilterSelection,
        isFalse: null as FilterSelection,
        startsWith: null as FilterSelection,
        endsWith: null as FilterSelection,
        contains: null as FilterSelection,
        isBlank: null as FilterSelection,
        isNotBlank: null as FilterSelection,
        relativeDateRange: null as FilterSelection
    };

    static get equal() {
        return FilterSelection.getFilterSelection('equal', () => new FilterSelectionEqual());
    }
    static get notEqual() {
        return FilterSelection.getFilterSelection('notEqual', () => new FilterSelectionNotEqual());
    }
    static get greaterThan() {
        return FilterSelection.getFilterSelection('greaterThan', () => new FilterSelectionGreaterThan());
    }
    static get lessThan() {
        return FilterSelection.getFilterSelection('lessThan', () => new FilterSelectionLessThan());
    }
    static get greaterThanOrEqual() {
        return FilterSelection.getFilterSelection('greaterThanOrEqual', () => new FilterSelectionGreaterThanOrEqual());
    }
    static get lessThanOrEqual() {
        return FilterSelection.getFilterSelection('lessThanOrEqual', () => new FilterSelectionLessThanOrEqual());
    }
    static get isTrue() {
        return FilterSelection.getFilterSelection('isTrue', () => new FilterSelectionIsTrue());
    }
    static get isFalse() {
        return FilterSelection.getFilterSelection('isFalse', () => new FilterSelectionIsFalse());
    }
    static get startsWith() {
        return FilterSelection.getFilterSelection('startsWith', () => new FilterSelectionStartsWith());
    }
    static get endsWith() {
        return FilterSelection.getFilterSelection('endsWith', () => new FilterSelectionEndsWith());
    }
    static get contains() {
        return FilterSelection.getFilterSelection('contains', () => new FilterSelectionContains());
    }
    static get isBlank() {
        return FilterSelection.getFilterSelection('isBlank', () => new FilterSelectionIsBlank());
    }
    static get isNotBlank() {
        return FilterSelection.getFilterSelection('isNotBlank', () => new FilterSelectionIsNotBlank());
    }
    static get relativeDateRange() {
        return FilterSelection.getFilterSelection('relativeDateRange', () => new FilterSelectionRelativeDateRange());
    }

    private static getFilterSelection(
        name: keyof typeof FilterSelection.selections,
        create: () => FilterSelection
    ) {
        return FilterSelection.selections[name] ||
            (FilterSelection.selections[name] = create());
    }

    private static allSelections: FilterSelection[];

    static get all() {
        return FilterSelection.allSelections || (
            FilterSelection.allSelections = new MappedArray(
                Object.keys(FilterSelection.selections),
                key => FilterSelection[key] as FilterSelection
            ).value()
        );
    }

    protected constructor(readonly displayText: string) {
    }

    abstract canSelect(sourceType: SourceType): boolean;

    abstract applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue);

    toString() { return this.displayText; }
}

class FilterSelectionEqual extends FilterSelection {
    constructor() {
        super('Equal To');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString() || sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.equal(value.toField(), value.toValue()));
    }
}

class FilterSelectionNotEqual extends FilterSelection {
    constructor() {
        super('Not Equal To');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString() || sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.notEqual(value.toField(), value.toValue()));
    }
}

class FilterSelectionGreaterThan extends FilterSelection {
    constructor() {
        super('Greater Than');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.greaterThan(value.toField(), value.toValue()));
    }
}

class FilterSelectionLessThan extends FilterSelection {
    constructor() {
        super('Less Than');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.lessThan(value.toField(), value.toValue()));
    }
}

class FilterSelectionGreaterThanOrEqual extends FilterSelection {
    constructor() {
        super('Greater Than or Equal To');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.greaterThanOrEqual(value.toField(), value.toValue()));
    }
}

class FilterSelectionLessThanOrEqual extends FilterSelection {
    constructor() {
        super('Less Than or Equal To');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.lessThanOrEqual(value.toField(), value.toValue()));
    }
}

class FilterSelectionIsTrue extends FilterSelection {
    constructor() {
        super('Is True');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isBoolean();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.equal(value.toField(), value.toValue()));
    }
}

class FilterSelectionIsFalse extends FilterSelection {
    constructor() {
        super('Is False');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isBoolean();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionValue) {
        filter.add(FilterConditionOperation.equal(value.toField(), value.toValue()));
    }
}

class FilterSelectionStartsWith extends FilterSelection {
    constructor() {
        super('Starts With');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionStringValue) {
        filter.add(FilterConditionFunction.startsWith(value.toField(), value.toValue()));
    }
}

class FilterSelectionEndsWith extends FilterSelection {
    constructor() {
        super('Ends With');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionStringValue) {
        filter.add(FilterConditionFunction.endsWith(value.toField(), value.toValue()));
    }
}

class FilterSelectionContains extends FilterSelection {
    constructor() {
        super('Contains');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionStringValue) {
        filter.add(FilterConditionFunction.contains(value.toField(), value.toValue()));
    }
}

class FilterSelectionIsBlank extends FilterSelection {
    constructor() {
        super('Is Blank');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionStringValue) {
        filter.add(FilterConditionOperation.equal(value.toField(), value.toValue()));
    }
}

class FilterSelectionIsNotBlank extends FilterSelection {
    constructor() {
        super('Is Not Blank');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionStringValue) {
        filter.add(FilterConditionOperation.notEqual(value.toField(), value.toValue()));
    }
}

class FilterSelectionRelativeDateRange extends FilterSelection {
    constructor() {
        super('Relative Date Range');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: FilterSelectionRelativeDateRangeValue) {
        filter.add(new FilterRelativeDateRange(value.toField(), value.toValue()));
    }
}