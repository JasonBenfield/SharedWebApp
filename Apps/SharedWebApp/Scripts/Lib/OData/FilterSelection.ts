﻿import { FilterSelectionStringValue } from "./FilterSelectionStringValue";
import { FilterConditionFunction, FilterConditionOperation, IFilterSelectionValue, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";
import { SourceType } from "./SourceType";

export abstract class FilterSelection {
    static get equal() { return new FilterSelectionEqual(); }
    static get notEqual() { return new FilterSelectionNotEqual(); }
    static get greaterThan() { return new FilterSelectionGreaterThan(); }
    static get lessThan() { return new FilterSelectionLessThan(); }
    static get greaterThanOrEqual() { return new FilterSelectionGreaterThanOrEqual(); }
    static get lessThanOrEqual() { return new FilterSelectionLessThanOrEqual(); }
    static get isTrue() { return new FilterSelectionIsTrue(); }
    static get isFalse() { return new FilterSelectionIsFalse(); }
    static get startsWith() { return new FilterSelectionStartsWith(); }
    static get endsWith() { return new FilterSelectionEndsWith(); }
    static get contains() { return new FilterSelectionContains(); }

    static get all() {
        return [
            FilterSelection.equal,
            FilterSelection.notEqual,
            FilterSelection.greaterThan,
            FilterSelection.lessThan,
            FilterSelection.greaterThanOrEqual,
            FilterSelection.lessThanOrEqual,
            FilterSelection.isTrue,
            FilterSelection.isFalse,
            FilterSelection.startsWith,
            FilterSelection.endsWith,
            FilterSelection.contains
        ];
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

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
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

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
        filter.add(FilterConditionOperation.notEqual(value.toField(), value.toValue()));
    }
}

class FilterSelectionGreaterThan extends FilterSelection {
    constructor() {
        super('Greater Than');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString() || sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
        filter.add(FilterConditionOperation.greaterThan(value.toField(), value.toValue()));
    }
}

class FilterSelectionLessThan extends FilterSelection {
    constructor() {
        super('Less Than');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString() || sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
        filter.add(FilterConditionOperation.lessThan(value.toField(), value.toValue()));
    }
}

class FilterSelectionGreaterThanOrEqual extends FilterSelection {
    constructor() {
        super('Greater Than or Equal To');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString() || sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
        filter.add(FilterConditionOperation.greaterThanOrEqual(value.toField(), value.toValue()));
    }
}

class FilterSelectionLessThanOrEqual extends FilterSelection {
    constructor() {
        super('Less Than or Equal To');
    }

    canSelect(sourceType: SourceType) {
        return sourceType.isString() || sourceType.isNumber() || sourceType.isDate();
    }

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
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

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
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

    applyToQuery(filter: ODataQueryFilterBuilder, value: IFilterSelectionValue) {
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
        filter.add(FilterConditionFunction.substringOf(value.toField(), value.toValue()));
    }
}