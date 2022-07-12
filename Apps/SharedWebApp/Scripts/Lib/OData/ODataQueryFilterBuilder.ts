﻿import { DateRange, ISerializableDateRange } from "../DateRange";
import { EnumerableArray, MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { ISerializableNumberRange, NumberRange } from "../NumberRange";
import { ISerializableRelativeDateRange, RelativeDateRange } from "../RelativeDateRange";

export interface IFilterSelectionValue {
    toField(): FilterField | FilterFieldFunction;
    toValue(): FilterValue | RelativeDateRange | DateRange;
}

export interface ISerializableFilter {
    conditionClauses: ISerializableFilterPart<ISerializableFilterConditionClause>[];
}

interface ISerializableFilterPart<T> {
    type: string;
    value: T;
}

type FilterPart =
    FilterConjunction |
    FilterField |
    FilterConditionOperation |
    FilterFieldFunction |
    FilterValue |
    FilterConditionFunction |
    FilterRelativeDateRange |
    FilterAbsoluteDateRange |
    FilterConditionClause |
    FilterAbsoluteNumberRange;

type SerializableFilterPart =
    ISerializableFilterConjunction |
    ISerializableFilterField |
    ISerializableFilterConditionOperation |
    ISerializableFilterFieldFunction |
    ISerializableFilterValue |
    ISerializableFilterConditionFunction |
    ISerializableFilterRelativeDateRange |
    ISerializableFilterAbsoluteDateRange |
    ISerializableFilterConditionClause |
    ISerializableFilterAbsoluteNumberRange;

class FilterPartFactory {
    static create<T extends FilterPart>(
        serializablePart: ISerializableFilterPart<SerializableFilterPart>
    ): T {
        let part: FilterPart;
        if (serializablePart.type === FilterConditionOperation.name) {
            part = FilterConditionOperation.deserialize(
                serializablePart.value as ISerializableFilterConditionOperation
            );
        }
        else if (serializablePart.type === FilterField.name) {
            part = FilterField.deserialize(
                serializablePart.value as ISerializableFilterField
            );
        }
        else if (serializablePart.type === FilterFieldFunction.name) {
            part = FilterFieldFunction.deserialize(
                serializablePart.value as ISerializableFilterFieldFunction
            );
        }
        else if (serializablePart.type === FilterValue.name) {
            part = FilterValue.deserialize(
                serializablePart.value as ISerializableFilterValue
            );
        }
        else if (serializablePart.type === FilterConjunction.name) {
            part = FilterConjunction.deserialize(
                serializablePart.value as ISerializableFilterConjunction
            );
        }
        else if (serializablePart.type === FilterConditionFunction.name) {
            part = FilterConditionFunction.deserialize(
                serializablePart.value as ISerializableFilterConditionFunction
            );
        }
        else if (serializablePart.type === FilterRelativeDateRange.name) {
            part = FilterRelativeDateRange.deserialize(
                serializablePart.value as ISerializableFilterRelativeDateRange
            );
        }
        else if (serializablePart.type === FilterAbsoluteDateRange.name) {
            part = FilterAbsoluteDateRange.deserialize(
                serializablePart.value as ISerializableFilterAbsoluteDateRange
            );
        }
        else if (serializablePart.type === FilterAbsoluteNumberRange.name) {
            part = FilterAbsoluteNumberRange.deserialize(
                serializablePart.value as ISerializableFilterAbsoluteNumberRange
            );
        }
        else if (serializablePart.type === FilterConditionClause.name) {
            part = FilterConditionClause.deserialize(
                serializablePart.value as ISerializableFilterConditionClause
            );
        }
        return part as T;
    }
}

interface ISerializableFilterConjunction {
    readonly value: string;
}

export class FilterConjunction {
    static deserialize(serialized: ISerializableFilterConjunction) {
        return new FilterConjunction(serialized.value);
    }

    static none() { return new FilterConjunction(''); }

    static and() { return new FilterConjunction('and'); }

    static or() { return new FilterConjunction('or'); }

    private constructor(private readonly value: string) {
    }

    format() {
        return this.toQuery();
    }

    toQuery() { return this.value ? ` ${this.value} ` : ''; }

    serialize() {
        return {
            type: FilterConjunction.name,
            value: { value: this.value }
        } as ISerializableFilterPart<ISerializableFilterConjunction>;
    }
}

interface ISerializableFilterConditionOperation {
    readonly left: ISerializableFilterPart<ISerializableFilterField | ISerializableFilterFieldFunction>;
    readonly operator: string;
    readonly right: ISerializableFilterPart<ISerializableFilterValue>;
}

export class FilterConditionOperation {
    static deserialize(serialized: ISerializableFilterConditionOperation) {
        return new FilterConditionOperation(
            FilterPartFactory.create(serialized.left),
            serialized.operator,
            FilterPartFactory.create(serialized.right)
        );
    }

    static equal(left: FilterField | FilterFieldFunction, right: FilterValue) {
        return new FilterConditionOperation(left, 'eq', right);
    }

    static notEqual(left: FilterField | FilterFieldFunction, right: FilterValue) {
        return new FilterConditionOperation(left, 'ne', right);
    }

    static lessThan(left: FilterField | FilterFieldFunction, right: FilterValue) {
        return new FilterConditionOperation(left, 'lt', right);
    }

    static lessThanOrEqual(left: FilterField | FilterFieldFunction, right: FilterValue) {
        return new FilterConditionOperation(left, 'le', right);
    }

    static greaterThan(left: FilterField | FilterFieldFunction, right: FilterValue) {
        return new FilterConditionOperation(left, 'gt', right);
    }

    static greaterThanOrEqual(left: FilterField | FilterFieldFunction, right: FilterValue) {
        return new FilterConditionOperation(left, 'ge', right);
    }

    private constructor(
        private readonly left: FilterField | FilterFieldFunction,
        private readonly operator: string,
        private readonly right: FilterValue
    ) {
    }

    format() {
        if (this.operator === 'eq' && this.right.value === '') {
            return `${this.left.format()} is blank`;
        }
        else if (this.operator === 'ne' && this.right.value === '') {
            return `${this.left.format()} is not blank`;
        }
        let operator = this.operator;
        if (operator === 'eq') {
            operator = 'is equal to'
        }
        else if (operator === 'ne') {
            operator = 'is not equal to'
        }
        if (operator === 'gt') {
            operator = 'is greater than'
        }
        else if (operator === 'lt') {
            operator = 'is less than'
        }
        if (operator === 'ge') {
            operator = 'is greater than or equal to'
        }
        else if (operator === 'le') {
            operator = 'is less than or equal to'
        }
        return `${this.left.format()} ${operator} ${this.right.format()}`;
    }

    toQuery() {
        return `${this.left.toQuery()} ${this.operator} ${this.right.toQuery()}`;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterConditionOperation> = {
            type: FilterConditionOperation.name,
            value: {
                left: this.left.serialize(),
                operator: this.operator,
                right: this.right.serialize()
            }
        };
        return serialized;
    }
}

interface ISerializableFilterField {
    readonly fieldName: string;
    readonly displayText: string;
}

export class FilterField {
    static deserialize(serialized: ISerializableFilterField) {
        return new FilterField(serialized.fieldName, serialized.displayText);
    }

    constructor(readonly fieldName: string, private readonly displayText: string) {
    }

    format() {
        return this.displayText;
    }

    toQuery() {
        return this.fieldName;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterField> = {
            type: FilterField.name,
            value: {
                fieldName: this.fieldName,
                displayText: this.displayText
            }
        };
        return serialized;
    }
}

interface ISerializableFilterFieldFunction {
    readonly functionName: string;
    readonly field: ISerializableFilterPart<ISerializableFilterField | ISerializableFilterFieldFunction>;
    readonly values: ISerializableFilterPart<ISerializableFilterValue>[];
}

export class FilterFieldFunction {
    static deserialize(serialized: ISerializableFilterFieldFunction) {
        const deserializedValues = new MappedArray(
            serialized.values,
            v => <FilterValue>FilterPartFactory.create(v)
        ).value();
        return new FilterFieldFunction(
            serialized.functionName,
            FilterPartFactory.create(serialized.field),
            ...deserializedValues
        );
    }

    static toLower(field: FilterField | FilterFieldFunction) {
        return new FilterFieldFunction('tolower', field);
    }

    static toUpper(field: FilterField | FilterFieldFunction) {
        return new FilterFieldFunction('toupper', field);
    }

    static trim(field: FilterField | FilterFieldFunction) {
        return new FilterFieldFunction('trim', field);
    }

    static substring(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterFieldFunction('substring', field, value);
    }

    static indexOf(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterFieldFunction('indexof', field, value);
    }

    static concat(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterFieldFunction('concat', field, value);
    }

    static round(field: FilterField | FilterFieldFunction) {
        return new FilterFieldFunction('round', field);
    }

    static floor(field: FilterField | FilterFieldFunction) {
        return new FilterFieldFunction('floor', field);
    }

    static ceiling(field: FilterField | FilterFieldFunction) {
        return new FilterFieldFunction('ceiling', field);
    }

    private readonly values: FilterValue[] = [];

    private constructor(
        private readonly functionName,
        readonly field: FilterField | FilterFieldFunction,
        ...values: FilterValue[]) {
        this.values = values;
    }

    format() {
        return this.toQuery();
    }

    toQuery() {
        const args = [this.field.toQuery()];
        const values = new MappedArray(
            this.values,
            v => v.toQuery()
        ).value();
        args.push(...values);
        const joined = new JoinedStrings(',', args).value();
        return `${this.functionName}(${joined})`;
    }

    serialize() {
        const serializedValues = new MappedArray(
            this.values,
            v => v.serialize()
        ).value();
        const serialized: ISerializableFilterPart<ISerializableFilterFieldFunction> = {
            type: FilterFieldFunction.name,
            value: {
                functionName: this.functionName,
                field: this.field.serialize(),
                values: serializedValues
            }
        };
        return serialized;
    }
}

export type FilterValueType = number | Date | boolean | string;

interface ISerializableFilterValue {
    readonly value: FilterValueType;
}

export class FilterValue {
    static deserialize(serialized: ISerializableFilterValue) {
        return new FilterValue(serialized.value);
    }

    constructor(readonly value: FilterValueType) {
    }

    format() {
        if (this.value instanceof Date) {
            return `${this.value.toLocaleDateString()}`;
        }
        return this.toQuery();
    }

    toQuery() {
        if (typeof this.value === 'number' || typeof this.value === 'boolean') {
            return this.value.toString();
        }
        if (this.value instanceof Date) {
            return `${this.value.toISOString()}`;
        }
        return `'${this.value}'`;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterValue> = {
            type: FilterValue.name,
            value: {
                value: this.value
            }
        };
        return serialized;
    }
}

interface ISerializableFilterConditionFunction {
    readonly functionName: string;
    readonly field: ISerializableFilterPart<ISerializableFilterField | ISerializableFilterFieldFunction>;
    readonly values: ISerializableFilterPart<ISerializableFilterValue>[];
}

export class FilterConditionFunction {
    static deserialize(serialized: ISerializableFilterConditionFunction) {
        const deserializedValues = new MappedArray(
            serialized.values,
            v => FilterPartFactory.create(v) as FilterValue
        ).value();
        return new FilterConditionFunction(
            serialized.functionName,
            FilterPartFactory.create(serialized.field),
            ...deserializedValues
        );
    }

    static startsWith(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterConditionFunction('startswith', field, value);
    }

    static endsWith(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterConditionFunction('endswith', field, value);
    }

    static contains(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterConditionFunction('contains', field, value);
    }

    private readonly values: FilterValue[];

    private constructor(
        private readonly functionName: string,
        private readonly field: FilterField | FilterFieldFunction,
        ...values: FilterValue[]
    ) {
        this.values = values;
    }

    format() {
        let functionName = this.functionName;
        if (this.functionName === 'startswith') {
            functionName = 'starts with';
        }
        else if (this.functionName === 'endswith') {
            functionName = 'ends with';
        }
        return `${this.field.format()} ${functionName} ${this.values[0].format()}`;
    }

    toQuery() {
        const args = [this.field.toQuery()];
        const values = new MappedArray(
            this.values,
            v => v.toQuery()
        ).value();
        args.push(...values);
        const joined = new JoinedStrings(',', args).value();
        return `${this.functionName}(${joined})`;
    }

    serialize() {
        const serializedValues = new MappedArray(
            this.values,
            v => v.serialize()
        ).value();
        const serialized: ISerializableFilterPart<ISerializableFilterConditionFunction> = {
            type: FilterConditionFunction.name,
            value: {
                functionName: this.functionName,
                field: this.field.serialize(),
                values: serializedValues
            }
        };
        return serialized;
    }
}

interface ISerializableFilterAbsoluteDateRange {
    readonly field: ISerializableFilterPart<ISerializableFilterField>;
    readonly range: ISerializableDateRange;
}

export class FilterAbsoluteDateRange {
    static deserialize(serialized: ISerializableFilterAbsoluteDateRange) {
        return new FilterAbsoluteDateRange(
            FilterPartFactory.create(serialized.field),
            DateRange.deserialize(serialized.range)
        );
    }

    constructor(
        private readonly field: FilterField,
        private readonly dateRange: DateRange
    ) {
    }

    getConditionClauses() {
        const conditionClauses: FilterConditionClause[] = [];
        const dateRange = this.dateRange;
        if (dateRange.start) {
            let condition: FilterConditionOperation;
            if (dateRange.start.isIncluded) {
                condition = FilterConditionOperation.greaterThanOrEqual(
                    this.field,
                    new FilterValue(dateRange.start.value)
                );
            }
            else {
                condition = FilterConditionOperation.greaterThan(
                    this.field,
                    new FilterValue(dateRange.start.value)
                );
            }
            conditionClauses.push(new FilterConditionClause(condition));
        }
        if (dateRange.end) {
            if (conditionClauses.length > 0) {
                conditionClauses[conditionClauses.length - 1].setAndConjunction();
            }
            let condition: FilterConditionOperation;
            if (dateRange.end.isIncluded) {
                condition = FilterConditionOperation.lessThanOrEqual(
                    this.field,
                    new FilterValue(dateRange.end.value)
                );
            }
            else {
                condition = FilterConditionOperation.lessThan(
                    this.field,
                    new FilterValue(dateRange.end.value)
                );
            }
            conditionClauses.push(new FilterConditionClause(condition));
        }
        return conditionClauses;
    }

    format() {
        return `${this.field.format()} ${this.dateRange.format()}`;
    }

    toQuery() {
        const clauses = this.getConditionClauses();
        return new JoinedStrings(
            '',
            new MappedArray(
                clauses,
                c => c.toQuery()
            )
        ).value();
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterAbsoluteDateRange> = {
            type: FilterAbsoluteDateRange.name,
            value: {
                field: this.field.serialize(),
                range: this.dateRange.serialize()
            }
        };
        return serialized;
    }
}

interface ISerializableFilterAbsoluteNumberRange {
    readonly field: ISerializableFilterPart<ISerializableFilterField>;
    readonly range: ISerializableNumberRange;
}

export class FilterAbsoluteNumberRange {
    static deserialize(serialized: ISerializableFilterAbsoluteNumberRange) {
        return new FilterAbsoluteNumberRange(
            FilterPartFactory.create(serialized.field),
            NumberRange.deserialize(serialized.range)
        );
    }

    constructor(
        private readonly field: FilterField,
        private readonly numberRange: NumberRange
    ) {
    }

    getConditionClauses() {
        const conditionClauses: FilterConditionClause[] = [];
        const numberRange = this.numberRange;
        if (numberRange.start) {
            let condition: FilterConditionOperation;
            if (numberRange.start.isIncluded) {
                condition = FilterConditionOperation.greaterThanOrEqual(
                    this.field,
                    new FilterValue(numberRange.start.value)
                );
            }
            else {
                condition = FilterConditionOperation.greaterThan(
                    this.field,
                    new FilterValue(numberRange.start.value)
                );
            }
            conditionClauses.push(new FilterConditionClause(condition));
        }
        if (numberRange.end) {
            if (conditionClauses.length > 0) {
                conditionClauses[conditionClauses.length - 1].setAndConjunction();
            }
            let condition: FilterConditionOperation;
            if (numberRange.end.isIncluded) {
                condition = FilterConditionOperation.lessThanOrEqual(
                    this.field,
                    new FilterValue(numberRange.end.value)
                );
            }
            else {
                condition = FilterConditionOperation.lessThan(
                    this.field,
                    new FilterValue(numberRange.end.value)
                );
            }
            conditionClauses.push(new FilterConditionClause(condition));
        }
        return conditionClauses;
    }

    format() {
        return `${this.field.format()} ${this.numberRange.format()}`;
    }

    toQuery() {
        const clauses = this.getConditionClauses();
        return new JoinedStrings(
            '',
            new MappedArray(
                clauses,
                c => c.toQuery()
            )
        ).value();
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterAbsoluteNumberRange> = {
            type: FilterAbsoluteNumberRange.name,
            value: {
                field: this.field.serialize(),
                range: this.numberRange.serialize()
            }
        };
        return serialized;
    }
}

interface ISerializableFilterRelativeDateRange {
    readonly field: ISerializableFilterPart<ISerializableFilterField>;
    readonly range: ISerializableRelativeDateRange;
}

export class FilterRelativeDateRange {
    static deserialize(serialized: ISerializableFilterRelativeDateRange) {
        return new FilterRelativeDateRange(
            FilterPartFactory.create(serialized.field),
            RelativeDateRange.deserialize(serialized.range)
        );
    }

    constructor(
        private readonly field: FilterField,
        private readonly relativeDateRange: RelativeDateRange
    ) {
    }

    getConditionClauses() {
        const dateRange = this.relativeDateRange.toDateRange();
        return new FilterAbsoluteDateRange(this.field, dateRange).getConditionClauses();
    }

    format() {
        return `${this.field.format()} ${this.relativeDateRange.format()}`;
    }

    toQuery() {
        const clauses = this.getConditionClauses();
        return new JoinedStrings(
            '',
            new MappedArray(
                clauses,
                c => c.toQuery()
            )
        ).value();
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterRelativeDateRange> = {
            type: FilterRelativeDateRange.name,
            value: {
                field: this.field.serialize(),
                range: this.relativeDateRange.serialize()
            }
        };
        return serialized;
    }
}

type SingleConditionType = FilterConditionOperation |
    FilterConditionFunction;

type ConditionType =
    SingleConditionType |
    FilterRelativeDateRange |
    FilterAbsoluteDateRange |
    FilterAbsoluteNumberRange;

type SerializableConditionType =
    ISerializableFilterConditionOperation |
    ISerializableFilterConditionFunction |
    ISerializableFilterRelativeDateRange |
    ISerializableFilterAbsoluteDateRange |
    ISerializableFilterAbsoluteNumberRange;

interface ISerializableFilterConditionClause {
    readonly condition: ISerializableFilterPart<SerializableConditionType>;
    readonly conjunction: ISerializableFilterPart<ISerializableFilterConjunction>;
}

export class FilterConditionClause {
    static deserialize(serialized: ISerializableFilterConditionClause) {
        return new FilterConditionClause(
            FilterPartFactory.create(serialized.condition),
            FilterPartFactory.create(serialized.conjunction)
        );
    }

    constructor(
        readonly condition: ConditionType,
        private _conjunction: FilterConjunction = FilterConjunction.none()) {
    }

    get conjunction() { return this._conjunction; }

    setAndConjunction() {
        this._conjunction = FilterConjunction.and();
    }

    removeConjunction() {
        this._conjunction = FilterConjunction.none();
    }

    toQuery() {
        return `${this.condition.toQuery()}${this._conjunction.toQuery()}`;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterConditionClause> = {
            type: FilterConditionClause.name,
            value: {
                condition: this.condition.serialize(),
                conjunction: this._conjunction.serialize()
            }
        };
        return serialized;
    }
}

export class ODataQueryFilterBuilder {
    private readonly conditionClauses: FilterConditionClause[] = [];

    constructor(serialized?: ISerializableFilter) {
        if (serialized) {
            this.fromSerialized(serialized);
        }
    }

    fromSerialized(serialized: ISerializableFilter) {
        for (const part of serialized.conditionClauses) {
            this.conditionClauses.push(FilterPartFactory.create(part));
        }
    }

    any() { return this.conditionClauses.length > 0; }

    getConditions() {
        return new EnumerableArray(this.conditionClauses).value();
    }

    deleteCondition(conditionClause: FilterConditionClause) {
        const index = this.conditionClauses.indexOf(conditionClause);
        if (index > -1) {
            this.conditionClauses.splice(0, 1);
            if (this.conditionClauses.length > 0) {
                this.conditionClauses[this.conditionClauses.length - 1].removeConjunction();
            }
        }
    }

    clear() {
        this.conditionClauses.splice(0, this.conditionClauses.length);
        return this;
    }

    add(condition: ConditionType) {
        if (this.conditionClauses.length > 0) {
            this.conditionClauses[this.conditionClauses.length - 1].setAndConjunction();
        }
        this.conditionClauses.push(new FilterConditionClause(condition));
        return this;
    }

    build() {
        return new JoinedStrings(
            '',
            new MappedArray(
                this.conditionClauses,
                c => c.toQuery()
            )
        ).value();
    }

    serialize() {
        const conditionClauses = new MappedArray(
            this.conditionClauses,
            c => c.serialize()
        ).value();
        const serialized: ISerializableFilter = {
            conditionClauses: conditionClauses
        };
        return serialized;
    }
}
