import { BooleanDropDownFormGroup } from "./BooleanDropDownFormGroup";
import { ComplexFieldFormGroup } from "./ComplexFieldFormGroup";
import { DateDropDownFormGroup } from "./DateDropDownFormGroup";
import { DateInputFormGroup } from "./DateInputFormGroup";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { FormGroupViewCollection } from "./FormGroupViewCollection";
import { InputFormGroupView } from "./InputFormGroupView";
import { NumberDropDownFormGroup } from "./NumberDropDownFormGroup";
import { NumberInputFormGroup } from "./NumberInputFormGroup";
import { TextDropDownFormGroup } from "./TextDropDownFormGroup";
import { TextInputFormGroup } from "./TextInputFormGroup";

export class FormGroupCollection {
    readonly values: IField[] = [];

    constructor(private readonly name: string) {
    }

    formGroups() {
        return this.values;
    }

    addHiddenTextFormGroup(name: string, view: InputFormGroupView) {
        return this.addFormGroup(new TextInputFormGroup(this.name, name, view));
    }

    addHiddenNumberFormGroup(name: string, view: InputFormGroupView) {
        return this.addFormGroup(new NumberInputFormGroup(this.name, name, view));
    }

    addHiddenDateFormGroup(name: string, view: InputFormGroupView) {
        return this.addFormGroup(new DateInputFormGroup(this.name, name, view));
    }

    addTextInputFormGroup(name: string, view: InputFormGroupView) {
        return this.addFormGroup(new TextInputFormGroup(this.name, name, view));
    }

    addNumberInputFormGroup(name: string, view: InputFormGroupView) {
        return this.addFormGroup(new NumberInputFormGroup(this.name, name, view));
    }

    addDateInputFormGroup(name: string, view: InputFormGroupView) {
        return this.addFormGroup(new DateInputFormGroup(this.name, name, view));
    }

    addTextDropDownFormGroup(name: string, view: DropDownFormGroupView<string>) {
        return this.addFormGroup(new TextDropDownFormGroup(this.name, name, view));
    }

    addNumberDropDownFormGroup(name: string, view: DropDownFormGroupView<number>) {
        return this.addFormGroup(new NumberDropDownFormGroup(this.name, name, view));
    }

    addDateDropDownFormGroup(name: string, view: DropDownFormGroupView<Date>) {
        return this.addFormGroup(new DateDropDownFormGroup(this.name, name, view));
    }

    addBooleanDropDownFormGroup(name: string, view: DropDownFormGroupView<boolean>) {
        return this.addFormGroup(new BooleanDropDownFormGroup(this.name, name, view));
    }

    addDropDownFormGroup<T>(name: string, view: DropDownFormGroupView<T>) {
        return this.addFormGroup(new DropDownFormGroup<T>(this.name, name, view));
    }

    addFormGroup<TField extends IField>(formGroup: TField) {
        this.values.push(formGroup);
        return formGroup;
    }

    forEach(action: (field: IField) => void) {
        for (let formGroup of this.formGroups()) {
            action(formGroup);
        }
    }

    getField(name: string) {
        let match: IField = null;
        for (let formGroup of this.formGroups()) {
            let testField = formGroup.getField(name);
            if (testField) {
                match = testField;
                break;
            }
        }
        return match;
    }

    clearErrors() {
        for (let field of this.formGroups()) {
            field.clearErrors();
        }
    }

    validate(errors: IErrorList) {
        for (let field of this.formGroups()) {
            field.validate(errors);
        }
    }

    import(values: Record<string, any>) {
        for (let field of this.formGroups()) {
            field.import(values);
        }
    }

    export(values: Record<string, any>) {
        for (let field of this.formGroups()) {
            field.export(values);
        }
    }
}