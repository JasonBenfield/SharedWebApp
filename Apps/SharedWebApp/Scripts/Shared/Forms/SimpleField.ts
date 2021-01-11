import { ColumnCss } from "../ColumnCss";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { FieldCaption } from "./FieldCaption";
import { FieldValue } from "./FieldValue";
import { FieldViewValue } from "./FieldViewValue";

export class SimpleField implements IField {

    constructor(
        prefix: string,
        name: string,
        private readonly vm: IFieldViewModel,
        fieldValue: FieldViewValue
    ) {
        this.caption = new FieldCaption(vm.caption);
        this.value = new FieldValue(prefix, name, vm.value, fieldValue);
    }

    readonly caption: FieldCaption;
    readonly value: FieldValue;

    getName() {
        return this.value.getName();
    }

    getCaption() {
        return this.caption.getCaption();
    }

    getField(name: string) { return this.getName() === name ? this : null; }

    setValue(value: any) { this.value.setValue(value); }

    getValue() {
        return this.value.getValue();
    }

    setColumns(captionColumns: ColumnCss, valueColumns: ColumnCss) {
        this.caption.setColumns(captionColumns);
        this.value.setColumns(valueColumns);
    }

    readonly constraints = new ConstraintCollection();

    show() {
        this.vm.isVisible(true);
    }

    hide() {
        this.vm.isVisible(false);
    }

    enable() {
        this.value.enable();
    }

    disable() {
        this.value.disable();
    }

    clearErrors() {
        this.vm.value.errors([]);
        this.vm.value.hasError(false);
    }

    validate(errors: IErrorList) {
        let fieldErrors = new ErrorList();
        this.constraints.validate(fieldErrors, this);
        this.vm.value.errors(fieldErrors.values());
        this.vm.value.hasError(fieldErrors.hasErrors());
        errors.merge(fieldErrors);
    }

    import(values: Record<string, any>) {
        let value = values[this.getName()];
        if (value !== undefined) {
            this.value.setValue(value);
        }
    }

    export(values: Record<string, any>) {
        values[this.getName()] = this.getValue();
    }
}
