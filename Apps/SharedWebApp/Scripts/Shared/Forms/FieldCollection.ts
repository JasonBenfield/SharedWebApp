export class FieldCollection {
    private readonly fields: IField[] = [];

    values() { return this.fields; }

    getField(name: string) {
        let match: IField = null;
        for (let field of this.fields) {
            let testField = field.getField(name);
            if (testField) {
                match = testField;
                break;
            }
        }
        return match;
    }

    addField<TField extends IField>(field: TField) {
        this.fields.push(field);
        return field;
    }

    clearErrors() {
        for (let field of this.fields) {
            field.clearErrors();
        }
    }

    validate(errors: IErrorList) {
        for (let field of this.fields) {
            field.validate(errors);
        }
    }

    import(values: Record<string, any>) {
        for (let field of this.fields) {
            field.import(values);
        }
    }

    export(values: Record<string, any>) {
        for (let field of this.fields) {
            field.export(values);
        }
    }
}