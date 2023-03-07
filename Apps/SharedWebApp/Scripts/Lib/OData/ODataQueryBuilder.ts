import { join } from "lodash";
import { FilteredArray, MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnBuilder } from "./ODataColumnBuilder";
import { ISerializableFilter, ODataQueryFilterBuilder } from "./ODataQueryFilterBuilder";

export interface ISerializableQuery {
    readonly select: ISerializableSelect;
    readonly filter: ISerializableFilter;
    readonly orderBy: ISerializableOrderBy;
}

export interface ISerializableSelect {
    readonly fields: ISelectField[];
}

export interface IOrderByField {
    readonly field: string;
    readonly isAscending: string;
}

export interface ISerializableOrderBy {
    readonly fields: IOrderByField[];
}

export interface ISelectField {
    readonly field: string;
    readonly isDatabaseField: boolean;
    readonly isExplicitlySelected: boolean;
}

export class ODataQueryBuilder {
    readonly apply: ODataQueryApplyBuilder;
    readonly select: ODataQuerySelectBuilder;
    readonly filter: ODataQueryFilterBuilder;
    readonly orderBy: ODataQueryOrderByBuilder;
    private _skip: number;
    private _top: number;

    constructor(serialized?: ISerializableQuery) {
        this.apply = new ODataQueryApplyBuilder();
        this.select = new ODataQuerySelectBuilder(serialized && serialized.select);
        this.filter = new ODataQueryFilterBuilder(serialized && serialized.filter);
        this.orderBy = new ODataQueryOrderByBuilder(serialized && serialized.orderBy);
    }

    skip(skip: number) {
        this._skip = skip;
        return this;
    }

    top(top: number) {
        this._top = top;
        return this;
    }

    clear() {
        this.select.clear();
        this.filter.clear();
        this.orderBy.clear();
        return this;
    }

    build() {
        const parts: string[] = []
        const apply = this.apply.build();
        if (apply) {
            parts.push(`$apply=${apply}`);
        }
        const select = this.select.build();
        if (select) {
            parts.push(`$select=${select}`);
        }
        const filter = this.filter.build();
        if (filter) {
            parts.push(`$filter=${filter}`);
        }
        const orderBy = this.orderBy.build();
        if (orderBy) {
            parts.push(`$orderBy=${orderBy}`);
        }
        if (this._skip) {
            parts.push(`$skip=${this._skip}`)
        }
        if (this._top) {
            parts.push(`$top=${this._top}`)
        }
        parts.push(`$count=true`);
        return new JoinedStrings('&', parts).value();
    }

    buildToExcel() {
        const parts: string[] = []
        const select = this.select.buildExplicitlySelected();
        if (select) {
            parts.push(`$select=${select}`);
        }
        const filter = this.filter.build();
        if (filter) {
            parts.push(`$filter=${filter}`);
        }
        const orderBy = this.orderBy.build();
        if (orderBy) {
            parts.push(`$orderBy=${orderBy}`);
        }
        parts.push(`$count=true`);
        return new JoinedStrings('&', parts).value();
    }

    serialize() {
        const serialized: ISerializableQuery = {
            select: this.select.serialize(),
            filter: this.filter.serialize(),
            orderBy: this.orderBy.serialize()
        };
        return serialized;
    }
}

export class ODataQuerySelectBuilder {
    private readonly requiredFields: string[] = [];
    private readonly fields: ISelectField[] = [];

    constructor(serialized?: ISerializableSelect) {
        if (serialized) {
            this.fields.splice(0, 0, ...serialized.fields);
        }
    }

    addRequiredFields(fields: ODataColumn[]) {
        for (const field of fields) {
            const fieldName = field.columnName;
            if (this.requiredFields.indexOf(fieldName) === -1) {
                this.requiredFields.push(fieldName);
            }
            if (!this.contains(fieldName)) {
                this.fields.push({
                    field: fieldName,
                    isDatabaseField: !field.sourceType.isNone(),
                    isExplicitlySelected: false
                });
            }
        }
        return this;
    }

    fromSerialized(serialized: ISerializableSelect) {
        for (const field of serialized.fields) {
            this.addField(field);
        }
    }

    clear() {
        const requiredFields = new MappedArray(
            this.requiredFields,
            requiredField => {
                const field: ISelectField = {
                    field: requiredField,
                    isDatabaseField: true,
                    isExplicitlySelected: false
                };
                return field;
            }
        ).value();
        this.fields.splice(0, this.fields.length, ...requiredFields);
        return this;
    }

    any() { return this.fields.length > 0; }

    contains(field: string) {
        return new FilteredArray(
            this.fields,
            f => f.field === field
        ).toEnumerableArray().any();
    }

    containsExplicitySelected(field: string) {
        return new FilteredArray(
            this.fields,
            f => f.field === field && f.isExplicitlySelected
        ).toEnumerableArray().any();
    }

    getExplicitlySelected() {
        return new MappedArray(
            new FilteredArray(
                this.fields,
                f => f.isExplicitlySelected
            ),
            f => f.field
        ).value();
    }

    addFields(...columns: (ODataColumnBuilder | ODataColumn)[]) {
        for (const column of columns) {
            const fieldName = column.columnName;
            this.addField({
                field: fieldName,
                isDatabaseField: !column.sourceType.isNone(),
                isExplicitlySelected: true
            });
        }
        return this;
    }

    private addField(selectField: ISelectField) {
        const index = this.fields.findIndex(f => f.field === selectField.field);
        if (index > -1) {
            this.fields.splice(index, 1);
        }
        this.fields.push(selectField);
    }

    moveField(source: string, destination: string) {
        const sourceIndex = this.fields.findIndex(f => f.field === source);
        if (sourceIndex > -1) {
            let destinationIndex = this.fields.findIndex(f => f.field === destination);
            if (destinationIndex === -1) {
                destinationIndex = this.fields.length;
            }
            if (sourceIndex !== destinationIndex) {
                const sourceField = this.fields[sourceIndex];
                this.fields.splice(sourceIndex, 1);
                if (destinationIndex > sourceIndex) {
                    this.fields.splice(destinationIndex - 1, 0, sourceField);
                }
                else {
                    this.fields.splice(destinationIndex, 0, sourceField);
                }
            }
        }
    }

    build() {
        return new JoinedStrings(
            ',',
            new MappedArray(
                new FilteredArray(
                    this.fields,
                    f => f.isDatabaseField
                ),
                f => f.field
            )
        ).value();
    }

    buildExplicitlySelected() {
        return new JoinedStrings(
            ',',
            new MappedArray(
                new FilteredArray(
                    this.fields,
                    f => f.isDatabaseField && f.isExplicitlySelected
                ),
                f => f.field
            )
        ).value();
    }

    serialize() {
        const serialized: ISerializableSelect = {
            fields: this.fields
        };
        return serialized;
    }
}

export class ODataQueryOrderByBuilder {
    private readonly fields: IOrderByField[] = [];

    constructor(serialized?: ISerializableOrderBy) {
        if (serialized) {
            this.fromSerialized(serialized);
        }
    }

    fromSerialized(serialized: ISerializableOrderBy) {
        this.fields.splice(0, 0, ...serialized.fields)
    }

    clear() {
        this.fields.splice(0, this.fields.length);
        return this;
    }

    getField(name: string) {
        return new FilteredArray(this.fields, f => f.field === name).toEnumerableArray().first();
    }

    addAscending(field: ODataColumnBuilder | ODataColumn) { return this.add(field, true); }

    addDescending(field: ODataColumnBuilder | ODataColumn) { return this.add(field, false); }

    private add(field: ODataColumnBuilder | ODataColumn, isAscending) {
        const fieldName = field.columnName;
        const index = this.fields.findIndex(f => f.field === fieldName);
        if (index > -1) {
            this.fields.splice(index, 1);
        }
        this.fields.push({ field: fieldName, isAscending: isAscending });
        return this;
    }

    build() {
        return new JoinedStrings(
            ',',
            new MappedArray(
                this.fields,
                f => this.formatField(f)
            )
        ).value();
    }

    private formatField(orderByField: IOrderByField) {
        const direction = orderByField.isAscending ? '' : ' desc';
        return `${orderByField.field}${direction}`;
    }

    serialize() {
        const serialized: ISerializableOrderBy = {
            fields: this.fields
        };
        return serialized;
    }
}

export type ApplyClauseType =
    ODataQueryFilterBuilder |
    ODataQueryGroupByBuilder |
    ODataQueryAggregateBuilder;

export class ODataQueryApplyBuilder {
    private readonly clauses: ApplyClauseType[] = [];

    addFilter() {
        const filter = new ODataQueryFilterBuilder();
        this.clauses.push(filter);
        return filter;
    }

    addGroupBy() {
        const groupBy = new ODataQueryGroupByBuilder();
        this.clauses.push(groupBy);
        return groupBy;
    }

    addAggregate() {
        const aggregate = new ODataQueryAggregateBuilder();
        this.clauses.push(aggregate);
        return aggregate;
    }

    build() {
        return new JoinedStrings(
            '/',
            new MappedArray(
                this.clauses,
                c => {
                    let query = c.build();
                    if (query) {
                        if (c instanceof ODataQueryFilterBuilder) {
                            query = `filter(${query})`;
                        }
                        else if (c instanceof ODataQueryGroupByBuilder) {
                            query = `groupby(${query})`;
                        }
                        else if (c instanceof ODataQueryAggregateBuilder) {
                            query = `aggregate(${query})`;
                        }
                    }
                    return query;
                }
            )
        ).value();
    }
}

export class ODataQueryGroupByBuilder {
    private readonly fields: string[] = [];
    readonly aggregate = new ODataQueryAggregateBuilder();

    addField(field: string) {
        this.fields.push(field);
        return this;
    }

    build() {
        const parts: string[] = [];
        if (this.fields.length > 0) {
            parts.push(
                new JoinedStrings(
                    ',',
                    new MappedArray(
                        this.fields,
                        f => `(${f})`
                    )
                ).value()
            );
            const aggregate = this.aggregate.build();
            if (aggregate) {
                parts.push(`aggregate(${aggregate})`);
            }
        }
        return new JoinedStrings(',', parts).value();
    }
}

export class ODataQueryAggregateBuilder {
    private readonly aggFuncs: ODataQueryAggregateFunction[] = [];

    addFunction(aggFunc: ODataQueryAggregateFunction) {
        this.aggFuncs.push(aggFunc);
        return this;
    }

    build() {
        return new JoinedStrings(
            ',',
            new MappedArray(
                this.aggFuncs,
                f => f.toQuery()
            )
        ).value()
    }
}

export class ODataQueryAggregateFunction {
    static sum(inputField: string, outputField = `sum${inputField}`) {
        return new ODataQueryAggregateFunction(inputField, 'sum', outputField);
    }

    static max(inputField: string, outputField = `max${inputField}`) {
        return new ODataQueryAggregateFunction(inputField, 'max', outputField);
    }

    static min(inputField: string, outputField = `min${inputField}`) {
        return new ODataQueryAggregateFunction(inputField, 'min', outputField);
    }

    constructor(
        private readonly inputField: string,
        private readonly functionName: string,
        private readonly outputField: string
    ) {
    }

    toQuery() {
        return `${this.inputField} with ${this.functionName} as ${this.outputField}`;
    }
}