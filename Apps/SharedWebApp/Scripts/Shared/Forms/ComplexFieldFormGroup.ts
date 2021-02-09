import { BlockViewModel } from "../Html/BlockViewModel";
import { FormGroup } from "../Html/FormGroup";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
import { FormGroupCollection } from "./FormGroupCollection";

export class ComplexFieldFormGroup extends FormGroup implements IField {
    constructor(
        prefix: string,
        name: string,
        vm: BlockViewModel = new BlockViewModel()
    ) {
        super(vm);
        this.name = prefix ? `${prefix}_${name}` : name;
        this.formGroups = new FormGroupCollection(this.name);
    }

    private layout = new ComplexFieldLayout(this);

    useLayout(createLayout: (fg: this) => ComplexFieldLayout) {
        this.layout = createLayout(this);
    }

    executeLayout() {
        this.layout.execute();
        this.formGroups.executeLayout();
    }

    private readonly name: string;

    getName() {
        return this.name;
    }

    setValue(_: any) {
    }

    getValue() {
        return null;
    }

    getField(name: string) {
        if (this.getName() === name) {
            return this;
        }
        return this.formGroups.getField(name);
    }

    private readonly formGroups: FormGroupCollection;

    forEachFormGroup(action: (field: IFormGroupField) => void) {
        this.formGroups.forEach(action);
    }

    protected addHiddenTextFormGroup(name: string) {
        return this.formGroups.addHiddenTextFormGroup(name);
    }

    protected addHiddenNumberFormGroup(name: string) {
        return this.formGroups.addHiddenNumberFormGroup(name);
    }

    protected addHiddenDateFormGroup(name: string) {
        return this.formGroups.addHiddenDateFormGroup(name);
    }

    protected addTextInputFormGroup(name: string) {
        return this.formGroups.addTextInputFormGroup(name);
    }

    protected addNumberInputFormGroup(name: string) {
        return this.formGroups.addNumberInputFormGroup(name);
    }

    protected addDateInputFormGroup(name: string) {
        return this.formGroups.addDateInputFormGroup(name);
    }

    protected addTextDropDownFormGroup(name: string) {
        return this.formGroups.addTextDropDownFormGroup(name);
    }

    protected addNumberDropDownFormGroup(name: string) {
        return this.formGroups.addNumberDropDownFormGroup(name);
    }

    protected addDateDropDownFormGroup(name: string) {
        return this.formGroups.addDateDropDownFormGroup(name);
    }

    protected addBooleanDropDownFormGroup(name: string) {
        return this.formGroups.addBooleanDropDownFormGroup(name);
    }

    protected addDropDownFormGroup<T>(name: string) {
        return this.formGroups.addDropDownFormGroup<T>(name);
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
