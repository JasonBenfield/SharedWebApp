﻿import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { BooleanDropDownFormGroup } from "./BooleanDropDownFormGroup";
import { DateDropDownFormGroup } from "./DateDropDownFormGroup";
import { DateInputFormGroup } from "./DateInputFormGroup";
import { DropDownFormGroup } from "./DropDownFormGroup";
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

    addHiddenTextFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        this.styleHiddenFormGroup(view);
        return this.addFormGroup(new TextInputFormGroup(this.name, name, view));
    }

    addHiddenNumberFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        this.styleHiddenFormGroup(view);
        return this.addFormGroup(new NumberInputFormGroup(this.name, name, view));
    }

    addHiddenDateFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        this.styleHiddenFormGroup(view);
        return this.addFormGroup(new DateInputFormGroup(this.name, name, view));
    }

    private styleHiddenFormGroup(view: SimpleFieldFormGroupInputView) {
        view.caption.hide();
        view.input.setType('hidden');
        view.setMargin(MarginCss.xs(0));
        view.setPadding(PaddingCss.xs(0));
    }

    addTextInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.addFormGroup(new TextInputFormGroup(this.name, name, view));
    }

    addNumberInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.addFormGroup(new NumberInputFormGroup(this.name, name, view));
    }

    addDateInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.addFormGroup(new DateInputFormGroup(this.name, name, view));
    }

    addTextDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addFormGroup(new TextDropDownFormGroup(this.name, name, view));
    }

    addNumberDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addFormGroup(new NumberDropDownFormGroup(this.name, name, view));
    }

    addDateDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addFormGroup(new DateDropDownFormGroup(this.name, name, view));
    }

    addBooleanDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addFormGroup(new BooleanDropDownFormGroup(this.name, name, view));
    }

    addDropDownFormGroup<T>(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addFormGroup(new DropDownFormGroup<T>(this.name, name, view));
    }

    addFormGroup<TField extends IField>(formGroup: TField) {
        this.values.push(formGroup);
        return formGroup;
    }

    forEach(action: (field: IField) => void) {
        for (const formGroup of this.formGroups()) {
            action(formGroup);
        }
    }

    getField(name: string) {
        let match: IField = null;
        for (const formGroup of this.formGroups()) {
            const testField = formGroup.getField(name);
            if (testField) {
                match = testField;
                break;
            }
        }
        return match;
    }

    clearErrors() {
        for (const field of this.formGroups()) {
            field.clearErrors();
        }
    }

    validate(errors: IErrorList) {
        for (const field of this.formGroups()) {
            field.validate(errors);
        }
    }

    import(values: Record<string, any>) {
        for (const field of this.formGroups()) {
            field.import(values);
        }
    }

    export(values: Record<string, any>) {
        for (const field of this.formGroups()) {
            field.export(values);
        }
    }
}