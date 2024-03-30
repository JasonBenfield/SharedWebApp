import { ComplexFieldFormGroupView } from "../Views/ComplexFieldFormGroupView";
import { SimpleFieldFormGroupDateTimeInputView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView, SimpleFieldFormGroupTimeSpanInputView } from "../Views/FormGroup";
import { InputView } from "../Views/InputView";
import { FormGroup } from "./FormGroup";
import { FormGroupCollection } from "./FormGroupCollection";

export class ComplexFieldFormGroup extends FormGroup implements IField {
    private readonly name: string;
    private readonly formGroups: FormGroupCollection;

    constructor(
        prefix: string,
        name: string,
        protected readonly view: ComplexFieldFormGroupView
    ) {
        super(view);
        this.name = prefix ? `${prefix}_${name}` : name;
        this.formGroups = new FormGroupCollection(this.name);
    }

    getName() { return this.name; }

    setValue(_: any) { }

    getValue() { return {}; }

    getField(name: string) {
        if (this.getName() === name) {
            return this;
        }
        return this.formGroups.getField(name);
    }

    forEachFormGroup(action: (field: IField) => void) {
        this.formGroups.forEach(action);
    }

    protected addHiddenText(name: string, view: InputView) {
        return this.formGroups.addHiddenText(name, view);
    }

    protected addHiddenNumber(name: string, view: InputView) {
        return this.formGroups.addHiddenNumber(name, view);
    }

    protected addHiddenDate(name: string, view: InputView) {
        return this.formGroups.addHiddenDate(name, view);
    }

    protected addHiddenDateTime(name: string, view: InputView) {
        return this.formGroups.addHiddenDateTime(name, view);
    }

    protected addHiddenTime(name: string, view: InputView) {
        return this.formGroups.addHiddenTime(name, view);
    }

    protected addHiddenTimeSpan(name: string, view: InputView) {
        return this.formGroups.addHiddenTimeSpan(name, view);
    }

    protected addTextInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addTextInputFormGroup(name, view);
    }

    protected addNumberInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addNumberInputFormGroup(name, view);
    }

    protected addDateInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addDateInputFormGroup(name, view);
    }

    protected addDateTimeInputFormGroup(name: string, view: SimpleFieldFormGroupDateTimeInputView) {
        return this.formGroups.addDateTimeInputFormGroup(name, view);
    }

    protected addTimeInputFormGroup(name: string, view: SimpleFieldFormGroupInputView) {
        return this.formGroups.addTimeInputFormGroup(name, view);
    }

    protected addTimeSpanInputFormGroup(name: string, view: SimpleFieldFormGroupTimeSpanInputView) {
        return this.formGroups.addTimeSpanInputFormGroup(name, view);
    }

    protected addTextDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addTextDropDownFormGroup(name, view);
    }

    protected addNumberDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addNumberDropDownFormGroup(name, view);
    }

    protected addDateDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addDateDropDownFormGroup(name, view);
    }

    protected addDateTimeDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addDateTimeDropDownFormGroup(name, view);
    }

    protected addTimeDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addTimeDropDownFormGroup(name, view);
    }

    protected addTimeSpanDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addTimeSpanDropDownFormGroup(name, view);
    }

    protected addBooleanDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addBooleanDropDownFormGroup(name, view);
    }

    protected addDropDownFormGroup(name: string, view: SimpleFieldFormGroupSelectView) {
        return this.formGroups.addDropDownFormGroup(name, view);
    }

    protected addFormGroup<TFormGroup extends IField>(name: string, formGroup: TFormGroup) {
        return this.formGroups.addField(formGroup);
    }

    clearErrors() {
        this.formGroups.clearErrors();
    }

    validate(errors: IErrorList) {
        this.formGroups.validate(errors);
    }

    import(values: Record<string, any>) {
        if (values) {
            this.formGroups.import(values);
        }
    }

    export(values: Record<string, any>) {
        this.formGroups.export(values);
    }
}
