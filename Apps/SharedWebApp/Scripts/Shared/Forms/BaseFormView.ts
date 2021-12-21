import { ModalErrorComponentView } from "../Error/ModalErrorComponentView";
import { FormGroupView } from "../Html/FormGroupView";
import { FormView } from "../Html/FormView";
import { FormViewModel } from "../Html/FormViewModel";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
import { FormGroupViewCollection } from "./FormGroupViewCollection";

export class BaseFormView extends FormView {
    private layout = new ComplexFieldLayout(this);

    private readonly formGroups = new FormGroupViewCollection();
    readonly modalError: ModalErrorComponentView;

    constructor(vm: FormViewModel = new FormViewModel()) {
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

    addDropDownFormGroup<TValue>() {
        return this.formGroups.addDropDownFormGroup<TValue>();
    }

    addFormGroup<TFormGroupView extends FormGroupView>(formGroup: TFormGroupView) {
        return this.formGroups.addFormGroup(formGroup);
    }
}
