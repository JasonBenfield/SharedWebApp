﻿import { JoinedStrings } from "../JoinedStrings";
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

    constructor(serialized?: ISerializableQuery, columns?: ODataColumn[]) {
        this.apply = new ODataQueryApplyBuilder();
        this.select = new ODataQuerySelectBuilder(serialized && serialized.select, columns || []);
        this.filter = new ODataQueryFilterBuilder(serialized && serialized.filter, columns || []);
        this.orderBy = new ODataQueryOrderByBuilder(serialized && serialized.orderBy, columns || []);
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

    constructor(serialized: ISerializableSelect, columns: ODataColumn[]) {
        if (serialized) {
            this.fromSerialized(serialized, columns);
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

    fromSerialized(serialized: ISerializableSelect, columns: ODataColumn[]) {
        for (const field of serialized.fields) {
            const column = columns.find(c => c.columnName.toLowerCase() === field.field.toLowerCase());
            if (column) {
                this.addField(field);
            }
        }
    }

    clear() {
        const requiredFields = this.requiredFields.map(
            requiredField => {
                const field: ISelectField = {
                    field: requiredField,
                    isDatabaseField: true,
                    isExplicitlySelected: false
                };
                return field;
            }
        );
        this.fields.splice(0, this.fields.length, ...requiredFields);
        return this;
    }

    any() { return this.fields.length > 0; }

    contains(field: string) {
        return this.fields.filter(f => f.field === field).length > 0;
    }

    containsExplicitySelected(field: string) {
        return this.fields.filter(f => f.field === field && f.isExplicitlySelected).length > 0;
    }

    getExplicitlySelected() {
        return this.fields.filter(f => f.isExplicitlySelected).map(f => f.field);
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
            this.fields.filter(f => f.isDatabaseField).map(f => f.field)
        ).value();
    }

    buildExplicitlySelected() {
        return new JoinedStrings(
            ',',
            this.fields.filter(f => f.isDatabaseField && f.isExplicitlySelected).map(f => f.field)
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

    constructor(serialized: ISerializableOrderBy, columns: ODataColumn[]) {
        if (serialized) {
            this.fromSerialized(serialized, columns);
        }
    }

    fromSerialized(serialized: ISerializableOrderBy, columns: ODataColumn[]) {
        for (const field of serialized.fields) {
            const column = columns.find(c => field.field.toLowerCase() === c.columnName.toLowerCase());
            if (column) {
                this.fields.splice(0, 0, field);
            }
        }
    }

    clear() {
        this.fields.splice(0, this.fields.length);
        return this;
    }

    getField(name: string) {
        return this.fields.filter(f => f.field === name)[0];
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
            this.fields.map(f => this.formatField(f))
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
        const filter = new ODataQueryFilterBuilder(null, []);
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
            this.clauses.map(
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
                    this.fields.map(f => `(${f})`)
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
            this.aggFuncs.map(f => f.toQuery())
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