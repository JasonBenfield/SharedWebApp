import { EnumerableArray, MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { ISerializableRelativeDateRange, RelativeDateRange } from "../RelativeDateRange";

export interface IFilterSelectionValue {
    toField(): FilterField | FilterFieldFunction;
    toValue(): FilterValue | RelativeDateRange;
}

export interface ISerializableFilter {
    conditionClauses: ISerializableFilterPart<ISerializableFilterConditionClause>[];
}

interface ISerializableFilterPart<T> {
    type: string;
    value: T;
}

class FilterPartFactory {
    static create(serializablePart: ISerializableFilterPart<any>) {
        let part: any;
        if (serializablePart.type === FilterConditionOperation.name) {
            part = FilterConditionOperation.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterField.name) {
            part = FilterField.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterFieldFunction.name) {
            part = FilterFieldFunction.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterValue.name) {
            part = FilterValue.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterConjunction.name) {
            part = FilterConjunction.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterConditionFunction.name) {
            part = FilterConditionFunction.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterRelativeDateRange.name) {
            part = FilterRelativeDateRange.deserialize(serializablePart.value);
        }
        else if (serializablePart.type === FilterConditionClause.name) {
            part = FilterConditionClause.deserialize(serializablePart.value);
        }
        return part;
    }
}

interface ISerializableConditionOperation {
    readonly left: ISerializableFilterPart<ISerializableFilterField | ISerializableFilterFieldFunction>;
    readonly operator: string;
    readonly right: ISerializableFilterPart<ISerializableFilterValue>;
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

export class FilterConditionOperation {
    static deserialize(serialized: ISerializableConditionOperation) {
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
        return {
            type: FilterConditionOperation.name,
            value: {
                left: this.left.serialize(),
                operator: this.operator,
                right: this.right.serialize()
            }
        } as ISerializableFilterPart<ISerializableConditionOperation>;
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
        return {
            type: FilterField.name,
            value: {
                fieldName: this.fieldName,
                displayText: this.displayText
            }
        } as ISerializableFilterPart<ISerializableFilterField>;
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
        return {
            type: FilterFieldFunction.name,
            value: {
                functionName: this.functionName,
                field: this.field.serialize(),
                values: serializedValues
            }
        } as ISerializableFilterPart<ISerializableFilterFieldFunction>;
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
        return {
            type: FilterValue.name,
            value: {
                value: this.value
            }
        } as ISerializableFilterPart<ISerializableFilterValue>;
    }
}

interface ISerializableFilterConditionFunction {
    readonly functionName: string;
    readonly field: ISerializableFilterPart<FilterField | FilterFieldFunction>;
    readonly values: ISerializableFilterPart<FilterValue>[];
}

export class FilterConditionFunction {
    static deserialize(serialized: ISerializableFilterConditionFunction) {
        const deserializedValues = new MappedArray(
            serialized.values,
            v => <FilterValue>FilterPartFactory.create(v)
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
        return {
            type: FilterConditionFunction.name,
            value: {
                functionName: this.functionName,
                field: this.field.serialize(),
                values: serializedValues
            }
        } as ISerializableFilterPart<ISerializableFilterConditionFunction>;
    }
}

interface ISerializableFilterRelativeDateRange {
    readonly field: ISerializableFilterPart<FilterField>;
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
        private readonly field: FilterField | FilterFieldFunction,
        private readonly relativeDateRange: RelativeDateRange
    ) {
    }

    getConditionClauses() {
        const conditionClauses: FilterConditionClause[] = [];
        const dateRange = this.relativeDateRange.toDateRange();
        if (dateRange.startDate) {
            const condition = FilterConditionOperation.greaterThanOrEqual(
                this.field,
                new FilterValue(dateRange.startDate)
            );
            conditionClauses.push(new FilterConditionClause(condition));
        }
        if (dateRange.endDate) {
            if (conditionClauses.length > 0) {
                conditionClauses[conditionClauses.length - 1].conjunction = FilterConjunction.and();
            }
            const endDate = dateRange.endDate;
            endDate.setDate(endDate.getDate() + 1);
            const condition = FilterConditionOperation.lessThan(
                this.field,
                new FilterValue(dateRange.endDate)
            );
            conditionClauses.push(new FilterConditionClause(condition));
        }
        return conditionClauses;
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
        return {
            type: FilterRelativeDateRange.name,
            value: {
                field: this.field.serialize(),
                range: this.relativeDateRange.serialize()
            }
        } as ISerializableFilterPart<ISerializableFilterRelativeDateRange>;
    }
}

type SingleConditionType = FilterConditionOperation |
    FilterConditionFunction;

type ConditionType = SingleConditionType | FilterRelativeDateRange;

interface ISerializableFilterConditionClause {
    readonly condition: ISerializableFilterPart<ConditionType>;
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
        public conjunction: FilterConjunction = FilterConjunction.none()) {
    }

    toQuery() {
        return `${this.condition.toQuery()}${this.conjunction.toQuery()}`;
    }

    serialize() {
        return {
            type: FilterConditionClause.name,
            value: {
                condition: this.condition.serialize() as any,
                conjunction: this.conjunction.serialize()
            }
        } as ISerializableFilterPart<ISerializableFilterConditionClause>;
    }
}

export class ODataQueryFilterBuilder {
    private readonly conditionClauses: FilterConditionClause[] = [];

    constructor(serialized?: ISerializableFilter) {
        if (serialized) {
            for (const part of serialized.conditionClauses) {
                this.conditionClauses.push(FilterPartFactory.create(part));
            }
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
                this.conditionClauses[this.conditionClauses.length - 1].conjunction = FilterConjunction.none();
            }
        }
    }

    clear() {
        this.conditionClauses.splice(0, this.conditionClauses.length);
        return this;
    }

    add(condition: ConditionType) {
        if (this.conditionClauses.length > 0) {
            this.conditionClauses[this.conditionClauses.length - 1].conjunction = FilterConjunction.and();
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

    toSerializable() {
        const conditionClauses = new MappedArray(
            this.conditionClauses,
            c => c.serialize()
        ).value();
        return {
            conditionClauses: conditionClauses
        } as ISerializableFilter;
    }
}
