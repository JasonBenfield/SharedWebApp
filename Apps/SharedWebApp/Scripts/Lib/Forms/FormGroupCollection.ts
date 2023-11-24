import { SimpleFieldFormGroupDateTimeInputView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView } from "../Views/FormGroup";
import { InputView } from "../Views/InputView";
import { BooleanDropDownFormGroup } from "./BooleanDropDownFormGroup";
import { DateDropDownFormGroup } from "./DateDropDownFormGroup";
import { DateInputFormGroup } from "./DateInputFormGroup";
import { DateTimeDropDownFormGroup } from "./DateTimeDropDownFormGroup";
import { DateTimeInputFormGroup } from "./DateTimeInputFormGroup";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { HiddenInputField } from "./HiddenInputField";
import { NumberDropDownFormGroup } from "./NumberDropDownFormGroup";
import { NumberInputFormGroup } from "./NumberInputFormGroup";
import { TextDropDownFormGroup } from "./TextDropDownFormGroup";
import { TextInputFormGroup } from "./TextInputFormGroup";
import { TextToDateOnlyViewValue } from "./TextToDateOnlyViewValue";
import { TextToDateViewValue } from "./TextToDateViewValue";
import { TextToNumberViewValue } from "./TextToNumberViewValue";
import { TextToTextViewValue } from "./TextToTextViewValue";

export class FormGroupCollection {
    readonly values: IField[] = [];

    constructor(private readonly name: string) {
    }

    formGroups() {
        return this.values;
    }

    addHiddenText(name: string, view: InputView) {
        return this.addField(new HiddenInputField(this.name, name, view, new TextToTextViewValue()));
    }

    addHiddenNumber(name: string, view: InputView) {
        return this.addField(new HiddenInputField(this.name, name, view, new TextToNumberViewValue()));
    }

    addHiddenDate(name: string, view: InputView) {
        return this.addField(new HiddenInputField(this.name, name, view, new TextToDateOnlyViewValue()));
    }

    addHiddenDateTime(name: string, view: InputView) {
        return this.addField(new HiddenInputField(this.name, name, view, new TextToDateViewValue()));
    }

    addTextInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.addField(new TextInputFormGroup(this.name, name, view));
    }

    addNumberInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.addField(new NumberInputFormGroup(this.name, name, view));
    }

    addDateInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.addField(new DateInputFormGroup(this.name, name, view));
    }

    addDateTimeInputFormGroup(name: string, view: SimpleFieldFormGroupDateTimeInputView) {
        return this.addField(new DateTimeInputFormGroup(this.name, name, view));
    }

    addTextDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addField(new TextDropDownFormGroup(this.name, name, view));
    }

    addNumberDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addField(new NumberDropDownFormGroup(this.name, name, view));
    }

    addDateDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addField(new DateDropDownFormGroup(this.name, name, view));
    }

    addDateTimeDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addField(new DateTimeDropDownFormGroup(this.name, name, view));
    }

    addBooleanDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addField(new BooleanDropDownFormGroup(this.name, name, view));
    }

    addDropDownFormGroup<T>(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.addField(new DropDownFormGroup<T>(this.name, name, view));
    }

    addField<TField extends IField>(formGroup: TField) {
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