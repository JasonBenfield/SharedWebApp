import { ModalErrorComponentView } from "../Error/ModalErrorComponentView";
import { FormComponent } from "../Html/FormComponent";
import { FormComponentViewModel } from "../Html/FormComponentViewModel";
import { FormGroupView } from "../Html/FormGroupView";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
import { FormGroupViewCollection } from "./FormGroupViewCollection";

export class BaseFormView extends FormComponent {
    private layout = new ComplexFieldLayout(this);

    readonly formGroups = new FormGroupViewCollection();
    readonly modalError: ModalErrorComponentView;

    constructor(vm: FormComponentViewModel = new FormComponentViewModel()) {
        super(vm);
        this.modalError = this.addContent(new ModalErrorComponentView());
    }

    useLayout(layout: ComplexFieldLayout) {
        this.layout = layout;
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
