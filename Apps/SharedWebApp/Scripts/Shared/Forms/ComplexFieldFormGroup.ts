import { FormGroup } from "../Html/FormGroup";
import { ComplexFieldFormGroupView } from "./ComplexFieldFormGroupView";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { FormGroupCollection } from "./FormGroupCollection";
import { InputFormGroupView } from "./InputFormGroupView";

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

    forEachFormGroup(action: (field: IFormGroupField) => void) {
        this.formGroups.forEach(action);
    }

    protected addHiddenTextFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addHiddenTextFormGroup(name, view);
    }

    protected addHiddenNumberFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addHiddenNumberFormGroup(name, view);
    }

    protected addHiddenDateFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addHiddenDateFormGroup(name, view);
    }

    protected addTextInputFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addTextInputFormGroup(name, view);
    }

    protected addNumberInputFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addNumberInputFormGroup(name, view);
    }

    protected addDateInputFormGroup(name: string, view: InputFormGroupView) {
        return this.formGroups.addDateInputFormGroup(name, view);
    }

    protected addTextDropDownFormGroup(name: string, view: DropDownFormGroupView<string>) {
        return this.formGroups.addTextDropDownFormGroup(name, view);
    }

    protected addNumberDropDownFormGroup(name: string, view: DropDownFormGroupView<number>) {
        return this.formGroups.addNumberDropDownFormGroup(name, view);
    }

    protected addDateDropDownFormGroup(name: string, view: DropDownFormGroupView<Date>) {
        return this.formGroups.addDateDropDownFormGroup(name, view);
    }

    protected addBooleanDropDownFormGroup(name: string, view: DropDownFormGroupView<boolean>) {
        return this.formGroups.addBooleanDropDownFormGroup(name, view);
    }

    protected addDropDownFormGroup<T>(name: string, view: DropDownFormGroupView<T>) {
        return this.formGroups.addDropDownFormGroup<T>(name, view);
    }

    protected addFormGroup<TFormGroup extends IFormGroupField>(name: string, formGroup: TFormGroup) {
        return this.formGroups.addFormGroup(formGroup);
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
