import { ColumnCss } from "../ColumnCss";
import { DateInputField } from "./DateInputField";
import { DropDownField } from "./DropDownField";
import { DropDownFieldViewModel } from "./DropDownFieldViewModel";
import { FieldCaption } from "./FieldCaption";
import { FieldCollection } from "./FieldCollection";
import { FieldValue } from "./FieldValue";
import { FieldViewValue } from "./FieldViewValue";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { NumberInputField } from "./NumberInputField";
import { TextInputField } from "./TextInputField";

export class ComplexField implements IField {
    constructor(
        prefix: string,
        name: string,
        captionVM: IFieldCaptionViewModel,
        valueVM: IFieldValueViewModel
    ) {
        this.caption = new FieldCaption(captionVM);
        this.value = new FieldValue(prefix, name, valueVM, new FieldViewValue());
    }

    readonly caption: FieldCaption;
    readonly value: FieldValue;

    getName() {
        return this.value.getName();
    }

    getCaption() {
        return this.caption.getCaption();
    }

    setValue(value: any) { this.value.setValue(value); }

    getValue() {
        return this.value.getValue();
    }

    setColumns(captionColumns: ColumnCss, valueColumns: ColumnCss) {
        this.caption.setColumns(captionColumns);
        this.value.setColumns(valueColumns);
    }

    private readonly fields = new FieldCollection();

    protected addHiddenTextField(name: string, vm: InputFieldViewModel) {
        return this.addField(TextInputField.hidden(this.getName(), name, vm));
    }

    protected addHiddenNumberField(name: string, vm: InputFieldViewModel) {
        return this.addField(NumberInputField.hidden(this.getName(), name, vm));
    }

    protected addHiddenDateField(name: string, vm: InputFieldViewModel) {
        return this.addField(DateInputField.hidden(this.getName(), name, vm));
    }

    protected addTextInputField(name: string, vm: InputFieldViewModel) {
        return this.addField(new TextInputField(this.getName(), name, vm));
    }

    protected addNumberInputField(name: string, vm: InputFieldViewModel) {
        return this.addField(new NumberInputField(this.getName(), name, vm));
    }

    protected addDateInputField(name: string, vm: InputFieldViewModel) {
        return this.addField(new DateInputField(this.getName(), name, vm));
    }

    protected addDropDownField<T>(name: string, vm: DropDownFieldViewModel) {
        return this.addField(new DropDownField<T>(this.getName(), name, vm));
    }

    addField<TField extends IField>(field: TField) {
        return this.fields.addField(field);
    }

    clearErrors() {
        this.fields.clearErrors();
    }

    validate(errors: IErrorList) {
        this.fields.validate(errors);
    }

    import(values: Record<string, any>) {
        this.fields.import(values);
    }

    export(values: Record<string, any>) {
        this.fields.export(values);
    }
}
