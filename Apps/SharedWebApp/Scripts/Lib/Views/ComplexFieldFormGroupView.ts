import { CssLengthUnit } from "../CssLengthUnit";
import { BasicComponentView } from "./BasicComponentView";
import { FormGroupGridView, FormGroupView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView } from "./FormGroup";
import { ViewConstructor } from "./Types";

export class ComplexFieldFormGroupView extends FormGroupView {
    private readonly grid: FormGroupGridView;

    constructor(container: BasicComponentView) {
        super(container);
        this.grid = this.valueCell.addView(FormGroupGridView);
        this.grid.layout();
        this.grid.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
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
