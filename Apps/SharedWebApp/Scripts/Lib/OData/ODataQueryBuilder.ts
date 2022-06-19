import { EnumerableArray, FilteredArray, MappedArray } from "../Enumerable";
import { JoinedStrings } from "../JoinedStrings";
import { ODataColumn } from "./ODataColumn";
import { ODataColumnBuilder } from "./ODataColumnBuilder";

export interface ISerializableQuery {
    readonly select: ISerializableSelect;
    readonly filter: ISerializableFilter;
    readonly orderBy: ISerializableOrderBy;
}

export interface ISerializableSelect {
    readonly fields: ISelectField[];
}

export interface ISerializableFilter {
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
    readonly isExplicitlySelected: boolean;
}

export class ODataQueryBuilder {
    readonly select: ODataQuerySelectBuilder;
    readonly filter: ODataQueryFilterBuilder;
    readonly orderBy: ODataQueryOrderByBuilder;
    private _skip: number;
    private _top: number;

    constructor(serialized?: ISerializableQuery) {
        this.select = new ODataQuerySelectBuilder(serialized && serialized.select);
        this.filter = new ODataQueryFilterBuilder(serialized && serialized.filter);
        this.orderBy = new ODataQueryOrderByBuilder(serialized && serialized.orderBy);
    }

    skip(skip: number) {
        this._skip = skip;
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

    toSerializable() {
        return {
            select: this.select.toSerializable(),
            filter: this.filter.toSerializable(),
            orderBy: this.orderBy.toSerializable()
        } as ISerializableQuery;
    }
}

export type QueryField = string | ODataColumnBuilder | ODataColumn;

export class ODataQuerySelectBuilder {
    private readonly requiredFields: string[] = [];
    private readonly fields: ISelectField[] = [];

    constructor(serialized?: ISerializableSelect) {
        if (serialized) {
            this.fields.splice(0, 0, ...serialized.fields);
        }
    }

    addRequiredFields(fields: QueryField[]) {
        for (const field of fields) {
            const fieldName = toFieldName(field);
            if (this.requiredFields.indexOf(fieldName) === -1) {
                this.requiredFields.push(fieldName);
            }
            if (!this.contains(fieldName)) {
                this.fields.push({ field: fieldName, isExplicitlySelected: false });
            }
        }
        return this;
    }

    clear() {
        const requiredFields = new MappedArray(
            this.requiredFields,
            requiredField => {
                return { field: requiredField, isExplicitlySelected: false } as ISelectField;
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
        return new MappedArray(this.fields, f => f.field).value();
    }

    add(field: QueryField) { return this.addFields(field); }

    addFields(...fields: QueryField[]) {
        for (const field of fields) {
            const fieldName = toFieldName(field);
            const index = new MappedArray(
                this.fields,
                f => f.field
            ).toEnumerableArray().indexOf(fieldName);
            if (index > -1) {
                this.fields.splice(index, 1);
            }
            this.fields.push({ field: fieldName, isExplicitlySelected: true });
        }
        return this;
    }

    build() {
        return new JoinedStrings(
            ',',
            new MappedArray(this.fields, f => f.field)
        ).value();
    }

    toSerializable() {
        return {
            fields: this.fields
        } as ISerializableSelect;
    }
}

export class ODataQueryFilterBuilder {
    constructor(serialized?: ISerializableFilter) {
        if (serialized) {
        }
    }

    clear() {
        return this;
    }

    build() {
        return '';
    }

    toSerializable() {
        return {
        } as ISerializableFilter;
    }
}

export class ODataQueryOrderByBuilder {
    private readonly fields: IOrderByField[] = [];

    constructor(serialized?: ISerializableOrderBy) {
        if (serialized) {
            this.fields.splice(0, 0, ...serialized.fields)
        }
    }

    clear() {
        this.fields.splice(0, this.fields.length);
        return this;
    }

    getField(name: string) {
        return new FilteredArray(this.fields, f => f.field === name).toEnumerableArray().first();
    }

    addAscending(field: QueryField) { return this.add(field, true); }

    addDescending(field: QueryField) { return this.add(field, false); }

    private add(field: QueryField, isAscending) {
        const fieldName = toFieldName(field);
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
        return `${orderByField.field} ${direction}`;
    }

    toSerializable() {
        return {
            fields: this.fields
        } as ISerializableOrderBy;
    }
}

function toFieldName(field: QueryField) {
    let fieldName: string;
    if (field instanceof ODataColumnBuilder) {
        fieldName = field.columnName;
    }
    else if (field instanceof ODataColumn) {
        fieldName = field.columnName;
    }
    else {
        fieldName = field;
    }
    return fieldName;
}