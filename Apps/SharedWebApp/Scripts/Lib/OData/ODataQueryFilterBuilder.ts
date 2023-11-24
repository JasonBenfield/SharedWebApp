import { DateOnly } from "../DateOnly";
import { DateRange, ISerializableDateRange } from "../DateRange";
import { JoinedStrings } from "../JoinedStrings";
import { ISerializableNumberRange, NumberRange } from "../NumberRange";
import { ISerializableRelativeDateRange, RelativeDateRange } from "../RelativeDateRange";
import { ODataColumn } from "./ODataColumn";

export interface IFilterSelectionValue {
    toField(): FilterField | FilterFieldFunction;
    toValue(): FilterValue | RelativeDateRange | DateRange;
}

export interface ISerializableFilter {
    conditionClauses: ISerializableFilterPart<ISerializableFilterConditionClause>[];
}

export interface ISerializableFilterPart<T> {
    type: string;
    value: T;
}

type FilterPart =
    FilterConjunction |
    FilterField |
    FilterConditionOperation |
    FilterFieldFunction |
    FilterValue |
    FilterStringValue |
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
    ISerializableFilterStringValue |
    ISerializableFilterConditionFunction |
    ISerializableFilterRelativeDateRange |
    ISerializableFilterAbsoluteDateRange |
    ISerializableFilterConditionClause |
    ISerializableFilterAbsoluteNumberRange;

export class FilterPartFactory {
    static create<T extends FilterPart>(
        serializablePart: ISerializableFilterPart<SerializableFilterPart>
    ): T {
        let part: FilterPart;
        if (serializablePart.type === FilterConditionOperation.typeName) {
            part = FilterConditionOperation.deserialize(
                serializablePart.value as ISerializableFilterConditionOperation
            );
        }
        else if (serializablePart.type === FilterField.typeName) {
            part = FilterField.deserialize(
                serializablePart.value as ISerializableFilterField
            );
        }
        else if (serializablePart.type === FilterFieldFunction.typeName) {
            part = FilterFieldFunction.deserialize(
                serializablePart.value as ISerializableFilterFieldFunction
            );
        }
        else if (serializablePart.type === FilterValue.typeName) {
            part = FilterValue.deserialize(
                serializablePart.value as ISerializableFilterValue
            );
        }
        else if (serializablePart.type === FilterStringValue.typeName) {
            part = FilterStringValue.deserialize(
                serializablePart.value as ISerializableFilterStringValue
            );
        }
        else if (serializablePart.type === FilterConjunction.typeName) {
            part = FilterConjunction.deserialize(
                serializablePart.value as ISerializableFilterConjunction
            );
        }
        else if (serializablePart.type === FilterConditionFunction.typeName) {
            part = FilterConditionFunction.deserialize(
                serializablePart.value as ISerializableFilterConditionFunction
            );
        }
        else if (serializablePart.type === FilterRelativeDateRange.typeName) {
            part = FilterRelativeDateRange.deserialize(
                serializablePart.value as ISerializableFilterRelativeDateRange
            );
        }
        else if (serializablePart.type === FilterAbsoluteDateRange.typeName) {
            part = FilterAbsoluteDateRange.deserialize(
                serializablePart.value as ISerializableFilterAbsoluteDateRange
            );
        }
        else if (serializablePart.type === FilterAbsoluteNumberRange.typeName) {
            part = FilterAbsoluteNumberRange.deserialize(
                serializablePart.value as ISerializableFilterAbsoluteNumberRange
            );
        }
        else if (serializablePart.type === FilterConditionClause.typeName) {
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
    static readonly typeName = 'FilterConjunction';

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
            type: FilterConjunction.typeName,
            value: { value: this.value }
        } as ISerializableFilterPart<ISerializableFilterConjunction>;
    }
}

interface ISerializableFilterConditionOperation {
    readonly left: ISerializableFilterPart<ISerializableFilterField | ISerializableFilterFieldFunction>;
    readonly operator: string;
    readonly right: ISerializableFilterPart<ISerializableFilterValue | ISerializableFilterStringValue>;
}

export class FilterConditionOperation {
    static readonly typeName = 'FilterConditionOperation';

    static deserialize(serialized: ISerializableFilterConditionOperation) {
        return new FilterConditionOperation(
            FilterPartFactory.create(serialized.left),
            serialized.operator,
            FilterPartFactory.create(serialized.right)
        );
    }

    static isIn(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        return new FilterConditionOperation(left, 'in', right);
    }

    static isNotIn(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        return new FilterConditionOperation(left, 'not in', right);
    }

    static equal(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        if (right.isArray()) {
            const arr = right.arrayValue();
            if (arr.length === 1) {
                if (right instanceof FilterStringValue) {
                    right = new FilterStringValue(right.ignoreCase, arr[0] as string);
                }
                else {
                    right = new FilterValue(arr[0] as FilterValueType);
                }
            }
        }
        if (right.isArray()) {
            return FilterConditionOperation.isIn(left, right);
        }
        return new FilterConditionOperation(left, 'eq', right);
    }

    static notEqual(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        if (right.isArray()) {
            const arr = right.arrayValue();
            if (arr.length === 1) {
                if (right instanceof FilterStringValue) {
                    right = new FilterStringValue(right.ignoreCase, arr[0] as string);
                }
                else {
                    right = new FilterValue(arr[0] as FilterValueType);
                }
            }
        }
        if (right.isArray()) {
            return FilterConditionOperation.isNotIn(left, right);
        }
        return new FilterConditionOperation(left, 'ne', right);
    }

    static lessThan(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        return new FilterConditionOperation(left, 'lt', right);
    }

    static lessThanOrEqual(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        return new FilterConditionOperation(left, 'le', right);
    }

    static greaterThan(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        return new FilterConditionOperation(left, 'gt', right);
    }

    static greaterThanOrEqual(left: FilterField | FilterFieldFunction, right: FilterValue | FilterStringValue) {
        return new FilterConditionOperation(left, 'ge', right);
    }

    private constructor(
        private readonly left: FilterField | FilterFieldFunction,
        private readonly operator: string,
        private readonly right: FilterValue | FilterStringValue
    ) {
    }

    isField(fieldName: string) {
        return this.left.isField(fieldName);
    }

    format() {
        if (this.operator === 'eq' && this.right.value === '') {
            return `${this.left.format()} is blank`;
        }
        else if (this.operator === 'ne' && this.right.value === '') {
            return `${this.left.format()} is not blank`;
        }
        let operator = this.operator;
        if (operator === 'in') {
            operator = 'is any of';
        }
        else if (operator === 'not in') {
            operator = 'is not any of';
        }
        else if (operator === 'eq') {
            operator = 'is equal to';
        }
        else if (operator === 'ne') {
            operator = 'is not equal to';
        }
        if (operator === 'gt') {
            operator = 'is greater than';
        }
        else if (operator === 'lt') {
            operator = 'is less than';
        }
        if (operator === 'ge') {
            operator = 'is greater than or equal to';
        }
        else if (operator === 'le') {
            operator = 'is less than or equal to';
        }
        return `${this.left.format()} ${operator} ${this.right.format()}`;
    }

    toQuery() {
        let left = this.left;
        if (left instanceof FilterField && this.right instanceof FilterStringValue && this.right.ignoreCase) {
            left = FilterFieldFunction.toLower(left);
        }
        const notOperator = this.operator === 'not in' ? 'not ' : '';
        const operator = this.operator === 'not in' ? 'in' : this.operator;
        return `${notOperator}${left.toQuery()} ${operator} ${this.right.toQuery()}`;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterConditionOperation> = {
            type: FilterConditionOperation.typeName,
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
    static readonly typeName = 'FilterField';

    static deserialize(serialized: ISerializableFilterField) {
        return new FilterField(serialized.fieldName, serialized.displayText);
    }

    constructor(readonly fieldName: string, private readonly displayText: string = fieldName) {
    }

    isField(fieldName: string) {
        return fieldName && this.fieldName.toLowerCase() === fieldName.toLowerCase();
    }

    format() {
        return this.displayText;
    }

    toQuery() {
        return this.fieldName;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterField> = {
            type: FilterField.typeName,
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
    static readonly typeName = 'FilterFieldFunction';

    static deserialize(serialized: ISerializableFilterFieldFunction) {
        const deserializedValues = serialized.values.map(
            v => <FilterValue>FilterPartFactory.create(v)
        );
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

    isField(fieldName: string) {
        if (this.field instanceof FilterField) {
            return this.field.isField(fieldName);
        }
        return this.field.field.isField(fieldName);
    }

    getField() {
        if (this.field instanceof FilterField) {
            return this.field;
        }
        return this.field.getField();
    }

    isToLower() { return this.functionName === 'tolower'; }

    format() {
        return this.toQuery();
    }

    toQuery() {
        const args = [this.field.toQuery()];
        const values = this.values.map(v => v.toQuery());
        args.push(...values);
        const joined = new JoinedStrings(',', args).value();
        return `${this.functionName}(${joined})`;
    }

    serialize() {
        const serializedValues = this.values.map(v => v.serialize());
        const serialized: ISerializableFilterPart<ISerializableFilterFieldFunction> = {
            type: FilterFieldFunction.typeName,
            value: {
                functionName: this.functionName,
                field: this.field.serialize(),
                values: serializedValues
            }
        };
        return serialized;
    }
}

export type FilterValueType = number | DateOnly | boolean | number[] | DateOnly[];

interface ISerializableFilterValue {
    readonly value: FilterValueType;
}

export class FilterValue {
    static readonly typeName = 'FilterValue';

    static deserialize(serialized: ISerializableFilterValue) {
        return new FilterValue(serialized.value);
    }

    constructor(readonly value: FilterValueType) {
    }

    isArray() { return Array.isArray(this.value); }

    arrayValue() { return this.value as FilterValueType[]; }

    format() {
        if (this.value instanceof Date) {
            return `${this.value.toLocaleDateString()}`;
        }
        return this.toQuery();
    }

    toQuery() {
        let query: string;
        if (this.isArray()) {
            const arr = this.arrayValue();
            const joined = new JoinedStrings(
                ',',
                arr.map(v => new FilterValue(v).toQuery())
            ).value();
            query = `(${joined})`;
        }
        else if (typeof this.value === 'number' || typeof this.value === 'boolean') {
            query = this.value.toString();
        }
        else if (this.value instanceof Date) {
            query = `${this.value.toISOString()}`;
        }
        else {
            query = `'${this.value}'`;
        }
        return query;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterValue> = {
            type: FilterValue.typeName,
            value: {
                value: this.value
            }
        };
        return serialized;
    }
}

interface ISerializableFilterStringValue {
    readonly value: string | string[];
    readonly ignoreCase: boolean;
}

export class FilterStringValue {
    static readonly typeName = 'FilterStringValue';

    static deserialize(serialized: ISerializableFilterStringValue) {
        return new FilterStringValue(serialized.ignoreCase, serialized.value);
    }

    constructor(readonly ignoreCase: boolean, readonly value: string | string[]) {
    }

    isArray() { return Array.isArray(this.value); }

    arrayValue() { return this.value as string[]; }

    format() {
        const ignoreCaseText = this.ignoreCase ? ' ( ignore case )' : '';
        let formatted: string;
        if (this.isArray()) {
            const arr = this.arrayValue();
            formatted = new JoinedStrings(
                ', ',
                arr
            ).value();
        }
        else {
            formatted = `'${this.value}'`;
        }
        return `${formatted}${ignoreCaseText}`;
    }

    toQuery() {
        let query: string;
        if (this.isArray()) {
            const arr = this.arrayValue();
            const joined = new JoinedStrings(
                ',',
                arr.map(v => new FilterStringValue(this.ignoreCase, v).toQuery())
            ).value();
            query = `(${joined})`;
        }
        else {
            let value = this.value as string;
            if (this.ignoreCase) {
                value = value.toLowerCase();
            }
            query = `'${value}'`;
        }
        return query;
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterStringValue> = {
            type: FilterStringValue.typeName,
            value: {
                value: this.value,
                ignoreCase: this.ignoreCase
            }
        };
        return serialized;
    }
}

interface ISerializableFilterConditionFunction {
    readonly functionName: string;
    readonly field: ISerializableFilterPart<ISerializableFilterField | ISerializableFilterFieldFunction>;
    readonly values: ISerializableFilterPart<ISerializableFilterStringValue>[];
}

export class FilterConditionFunction {
    static readonly typeName = 'FilterConditionFunction';

    static deserialize(serialized: ISerializableFilterConditionFunction) {
        const deserializedValues = serialized.values.map(
            v => FilterPartFactory.create(v) as FilterStringValue
        );
        return new FilterConditionFunction(
            serialized.functionName,
            FilterPartFactory.create(serialized.field),
            ...deserializedValues
        );
    }

    static startsWith(field: FilterField | FilterFieldFunction, value: FilterStringValue) {
        return new FilterConditionFunction('startswith', field, value);
    }

    static endsWith(field: FilterField | FilterFieldFunction, value: FilterStringValue) {
        return new FilterConditionFunction('endswith', field, value);
    }

    static contains(field: FilterField | FilterFieldFunction, value: FilterStringValue) {
        return new FilterConditionFunction('contains', field, value);
    }

    private readonly values: FilterStringValue[];

    private constructor(
        private readonly functionName: string,
        private readonly field: FilterField | FilterFieldFunction,
        ...values: FilterStringValue[]
    ) {
        this.values = values;
    }

    isField(fieldName: string) {
        return this.field.isField(fieldName);
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
        let left = this.field;
        if (left instanceof FilterField && this.values[0] instanceof FilterStringValue && this.values[0].ignoreCase) {
            left = FilterFieldFunction.toLower(left);
        }
        const args = [left.toQuery()];
        const values = this.values.map(v => v.toQuery());
        args.push(...values);
        const joined = new JoinedStrings(',', args).value();
        return `${this.functionName}(${joined})`;
    }

    serialize() {
        const serializedValues = this.values.map(v => v.serialize());
        const serialized: ISerializableFilterPart<ISerializableFilterConditionFunction> = {
            type: FilterConditionFunction.typeName,
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
    static readonly typeName = 'FilterAbsoluteDateRange';

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

    isField(fieldName: string) {
        return this.field.isField(fieldName);
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
            clauses.map(c => c.toQuery())
        ).value();
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterAbsoluteDateRange> = {
            type: FilterAbsoluteDateRange.typeName,
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
    static readonly typeName = 'FilterAbsoluteNumberRange';

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

    isField(fieldName: string) {
        return this.field.isField(fieldName);
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
            clauses.map(c => c.toQuery())
        ).value();
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterAbsoluteNumberRange> = {
            type: FilterAbsoluteNumberRange.typeName,
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
    static readonly typeName = 'FilterRelativeDateRange';

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

    isField(fieldName: string) {
        return this.field.isField(fieldName);
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
            clauses.map(c => c.toQuery())
        ).value();
    }

    serialize() {
        const serialized: ISerializableFilterPart<ISerializableFilterRelativeDateRange> = {
            type: FilterRelativeDateRange.typeName,
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

export type SerializableConditionType =
    ISerializableFilterConditionOperation |
    ISerializableFilterConditionFunction |
    ISerializableFilterRelativeDateRange |
    ISerializableFilterAbsoluteDateRange |
    ISerializableFilterAbsoluteNumberRange;

export interface ISerializableFilterConditionClause {
    readonly condition: ISerializableFilterPart<SerializableConditionType>;
    readonly conjunction: ISerializableFilterPart<ISerializableFilterConjunction>;
}

export class FilterConditionClause {
    static readonly typeName = 'FilterConditionClause';

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

    isField(fieldName: string) {
        return this.condition.isField(fieldName);
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
            type: FilterConditionClause.typeName,
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

    constructor(serialized: ISerializableFilter, private readonly columns: ODataColumn[]) {
        if (serialized) {
            this.fromSerialized(serialized, columns);
        }
    }

    fromFilter(filter: ODataQueryFilterBuilder) {
        this.fromSerialized(filter.serialize(), this.columns);
    }

    fromSerialized(serialized: ISerializableFilter, columns: ODataColumn[]) {
        for (const part of serialized.conditionClauses) {
            const deserializedCondition = FilterPartFactory.create(part) as FilterConditionClause;
            const column = this.columns.find(c => deserializedCondition.isField(c.columnName));
            if (column) {
                this.conditionClauses.push(deserializedCondition);
            }
        }
    }

    any() { return this.conditionClauses.length > 0; }

    isField(name: string) {
        return this.conditionClauses.filter(f => f.condition.isField(name)).length > 0;
    }

    getConditions() {
        return this.conditionClauses.map(c => c);
    }

    removeField(fieldName: string) {
        for (const clause of this.conditionClauses) {
            if (clause.isField(fieldName)) {
                this.remove(clause);
            }
        }
    }

    remove(conditionClause: FilterConditionClause) {
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
            this.conditionClauses.map(c => c.toQuery())
        ).value();
    }

    serialize() {
        const conditionClauses = this.conditionClauses.map(c => c.serialize());
        const serialized: ISerializableFilter = {
            conditionClauses: conditionClauses
        };
        return serialized;
    }
}
