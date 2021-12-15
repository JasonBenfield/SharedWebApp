import { BooleanDropDownFormGroup } from "./BooleanDropDownFormGroup";
import { ComplexFieldFormGroup } from "./ComplexFieldFormGroup";
import { DateDropDownFormGroup } from "./DateDropDownFormGroup";
import { DateInputFormGroup } from "./DateInputFormGroup";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { FormGroupViewCollection } from "./FormGroupViewCollection";
import { InputFormGroupView } from "./InputFormGroupView";
import { NumberDropDownFormGroup } from "./NumberDropDownFormGroup";
import { NumberInputFormGroup } from "./NumberInputFormGroup";
import { TextDropDownFormGroup } from "./TextDropDownFormGroup";
import { TextInputFormGroup } from "./TextInputFormGroup";

export class FormGroupCollection {
    readonly values: IField[] = [];

    constructor(
        private readonly name: string,
        private readonly views: FormGroupViewCollection) {
    }

    formGroups() {
        return this.values;
    }

    addHiddenTextFormGroup(name: string) {
        let view = this.views.addHiddenInputFormGroup();
        return this.addFormGroup(new TextInputFormGroup(this.name, name, view));
    }

    addHiddenNumberFormGroup(name: string) {
        let view = this.views.addHiddenInputFormGroup();
        return this.addFormGroup(new NumberInputFormGroup(this.name, name, view));
    }

    addHiddenDateFormGroup(name: string) {
        let view = this.views.addHiddenInputFormGroup();
        return this.addFormGroup(new DateInputFormGroup(this.name, name, view));
    }

    addTextInputFormGroup(name: string) {
        let view = this.views.addInputFormGroup();
        return this.addFormGroup(new TextInputFormGroup(this.name, name, view));
    }

    addNumberInputFormGroup(name: string) {
        let view = this.views.addInputFormGroup();
        return this.addFormGroup(new NumberInputFormGroup(this.name, name, view));
    }

    addDateInputFormGroup(name: string) {
        let view = this.views.addInputFormGroup();
        return this.addFormGroup(new DateInputFormGroup(this.name, name, view));
    }

    addTextDropDownFormGroup(name: string) {
        let view = this.views.addDropDownFormGroup<string>();
        return this.addFormGroup(new TextDropDownFormGroup(this.name, name, view));
    }

    addNumberDropDownFormGroup(name: string) {
        let view = this.views.addDropDownFormGroup<number>();
        return this.addFormGroup(new NumberDropDownFormGroup(this.name, name, view));
    }

    addDateDropDownFormGroup(name: string) {
        let view = this.views.addDropDownFormGroup<Date>();
        return this.addFormGroup(new DateDropDownFormGroup(this.name, name, view));
    }

    addBooleanDropDownFormGroup(name: string) {
        let view = this.views.addDropDownFormGroup<boolean>();
        return this.addFormGroup(new BooleanDropDownFormGroup(this.name, name, view));
    }

    addDropDownFormGroup<T>(name: string) {
        let view = this.views.addDropDownFormGroup<T>();
        return this.addFormGroup(new DropDownFormGroup<T>(this.name, name, view));
    }

    addFormGroup<TFormGroup extends IField>(formGroup: TFormGroup) {
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