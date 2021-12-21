import { BlockViewModel } from "../Html/BlockViewModel";
import { FormGroupView } from "../Html/FormGroupView";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
import { FormGroupViewCollection } from "./FormGroupViewCollection";

export class ComplexFieldFormGroupView extends FormGroupView {
    private layout = new ComplexFieldLayout(this);
    readonly formGroups: FormGroupViewCollection;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.formGroups = new FormGroupViewCollection();
    }

    useLayout(createLayout: (fg: this) => ComplexFieldLayout) {
        this.layout = createLayout(this);
    }

    executeLayout() {
        this.layout.execute();
        this.formGroups.executeLayout();
    }

    forEachFormGroup(action: (field: FormGroupView) => void) {
        this.formGroups.forEach(action);
    }

    addHiddenFormGroup() {
        return this.formGroups.addHiddenInputFormGroup();
    }

    addInputFormGroup() {
        return this.formGroups.addInputFormGroup();
    }

    addDropDownFormGroup() {
        return this.formGroups.addDropDownFormGroup();
    }

    addFormGroup<TFormGroupView extends FormGroupView>(formGroup: TFormGroupView) {
        return this.formGroups.addFormGroup(formGroup);
    }
}
