import { MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";

export interface IFilterSelectionValue {
    toField(): FilterField | FilterFieldFunction;
    toValue(): FilterValue;
}

export interface ISerializableFilter {
    conditions: ISerializableFilterPart<ISerializableConditionOperation>[];
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

    static and() { return new FilterConjunction('and'); }

    static or() { return new FilterConjunction('or'); }

    private constructor(private readonly value: string) {
    }

    toQuery() { return ` ${this.value} `; }

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
}

export class FilterField {
    static deserialize(serialized: ISerializableFilterField) {
        return new FilterField(serialized.fieldName);
    }

    constructor(readonly fieldName: string) {
    }

    toQuery() {
        return this.fieldName;
    }

    serialize() {
        return {
            type: FilterField.name,
            value: {
                fieldName: this.fieldName
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
        private readonly field: FilterField | FilterFieldFunction,
        ...values: FilterValue[]) {
        this.values = values;
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

interface ISerializableFilterValue {
    readonly value: any;
}

export class FilterValue {
    static deserialize(serialized: ISerializableFilterValue) {
        return new FilterValue(serialized.value);
    }

    constructor(readonly value: any) {
    }

    toQuery() {
        if (typeof this.value === 'number' || typeof this.value === 'boolean') {
            return this.value.toString();
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

    static substringOf(field: FilterField | FilterFieldFunction, value: FilterValue) {
        return new FilterConditionFunction('substringof', field, value);
    }

    private readonly values: FilterValue[];

    private constructor(
        private readonly functionName: string,
        private readonly field: FilterField | FilterFieldFunction,
        ...values: FilterValue[]
    ) {
        this.values = values;
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

export class ODataQueryFilterBuilder {
    private readonly conditions: (FilterConditionOperation | FilterConditionFunction | FilterConjunction)[] = [];

    constructor(serialized?: ISerializableFilter) {
        if (serialized) {
            for (const part of serialized.conditions) {
                this.conditions.push(FilterPartFactory.create(part));
            }
        }
    }

    clear() {
        this.conditions.splice(0, this.conditions.length);
        return this;
    }

    add(condition: FilterConditionOperation | FilterConditionFunction) {
        if (this.conditions.length > 0) {
            this.conditions.push(FilterConjunction.and());
        }
        this.conditions.push(condition);
        return this;
    }

    build() {
        return new JoinedStrings(
            '',
            new MappedArray(
                this.conditions,
                c => c.toQuery()
            )
        ).value();
    }

    toSerializable() {
        const conditions = new MappedArray(
            this.conditions,
            c => c.serialize()
        ).value();
        return {
            conditions: conditions
        } as ISerializableFilter;
    }
}
