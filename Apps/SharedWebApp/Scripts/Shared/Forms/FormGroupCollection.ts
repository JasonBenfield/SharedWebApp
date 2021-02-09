import { BooleanDropDownFormGroup } from "./BooleanDropDownFormGroup";
import { ComplexFieldFormGroup } from "./ComplexFieldFormGroup";
import { DateDropDownFormGroup } from "./DateDropDownFormGroup";
import { DateInputFormGroup } from "./DateInputFormGroup";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { InputFormGroup } from "./InputFormGroup";
import { NumberDropDownFormGroup } from "./NumberDropDownFormGroup";
import { NumberInputFormGroup } from "./NumberInputFormGroup";
import { TextDropDownFormGroup } from "./TextDropDownFormGroup";
import { TextInputFormGroup } from "./TextInputFormGroup";

export class FormGroupCollection {
    constructor(private readonly name: string) {
    }

    readonly values: IFormGroupField[] = [];

    formGroups() {
        return this.values;
    }

    addHiddenTextFormGroup(name: string) {
        let formGroup = this.addTextInputFormGroup(name);
        this.hideFormGroup(formGroup);
        return formGroup;
    }

    addHiddenNumberFormGroup(name: string) {
        let formGroup = this.addNumberInputFormGroup(name);
        this.hideFormGroup(formGroup);
        return formGroup;
    }

    addHiddenDateFormGroup(name: string) {
        let formGroup = this.addDateInputFormGroup(name);
        this.hideFormGroup(formGroup);
        return formGroup;
    }

    private hideFormGroup(formGroup: InputFormGroup<any>) {
        formGroup.input.setType('hidden');
        formGroup.hide();
    }

    addTextInputFormGroup(name: string) {
        return this.addFormGroup(new TextInputFormGroup(this.name, name));
    }

    addNumberInputFormGroup(name: string) {
        return this.addFormGroup(new NumberInputFormGroup(this.name, name));
    }

    addDateInputFormGroup(name: string) {
        return this.addFormGroup(new DateInputFormGroup(this.name, name));
    }

    addTextDropDownFormGroup(name: string) {
        return this.addFormGroup(new TextDropDownFormGroup(this.name, name));
    }

    addNumberDropDownFormGroup(name: string) {
        return this.addFormGroup(new NumberDropDownFormGroup(this.name, name));
    }

    addDateDropDownFormGroup(name: string) {
        return this.addFormGroup(new DateDropDownFormGroup(this.name, name));
    }

    addBooleanDropDownFormGroup(name: string) {
        return this.addFormGroup(new BooleanDropDownFormGroup(this.name, name));
    }

    addDropDownFormGroup<T>(name: string) {
        return this.addFormGroup(new DropDownFormGroup<T>(this.name, name));
    }

    addFormGroup<TFormGroup extends IFormGroupField>(formGroup: TFormGroup) {
        this.values.push(formGroup);
        return formGroup;
    }

    executeLayout() {
        this.forEach(fg => {
            if (fg instanceof ComplexFieldFormGroup) {
                fg.executeLayout();
            }
        });
    }

    forEach(action: (field: IFormGroupField) => void) {
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