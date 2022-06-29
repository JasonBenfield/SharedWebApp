import { CssLengthUnit } from "../CssLengthUnit";
import { BasicComponentView } from "./BasicComponentView";
import { FormGroupGridView, FormGroupView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView } from "./FormGroup";
import { FormView } from "./FormView";
import { ModalErrorView } from "./ModalError";
import { ViewConstructor } from "./Types";

export class BaseFormView extends FormView {
    private readonly grid: FormGroupGridView;
    readonly modalError: ModalErrorView;

    constructor(container: BasicComponentView) {
        super(container);
        this.grid = this.addView(FormGroupGridView);
        this.grid.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        this.modalError = this.addView(ModalErrorView);
    }

    addHiddenInputFormGroup() {
        const formGroup = this.addInputFormGroup();
        this.hideFormGroup(formGroup);
        return formGroup;
    }

    private hideFormGroup(formGroup: SimpleFieldFormGroupInputView) {
        formGroup.input.setType('hidden');
        formGroup.hide();
    }

    addInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupInputView);
    }

    addDropDownFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupSelectView);
    }

    addFormGroup<TView extends FormGroupView>(ctor: ViewConstructor<TView>) {
        return this.grid.addFormGroup<TView>(ctor);
    }
}
