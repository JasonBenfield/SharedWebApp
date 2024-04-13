import { BasicComponentView } from "./BasicComponentView";
import { FormGroupView, SimpleFieldFormGroupDateTimeInputView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView, SimpleFieldFormGroupTimeSpanInputView } from "./FormGroup";
import { FormGroupContainerView } from "./FormGroupContainerView";
import { InputView } from "./InputView";
import { ViewConstructor } from "./Types";

export class ComplexFieldFormGroupView extends FormGroupView {
    private readonly formGroupContainerView: FormGroupContainerView;

    constructor(container: BasicComponentView) {
        super(container);
        this.formGroupContainerView = this.valueCell.addView(FormGroupContainerView);
    }

    addHiddenInput() {
        const inputView = this.addView(InputView);
        inputView.setType('hidden');
        return inputView;
    }

    addInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupInputView);
    }

    addDateTimeInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupDateTimeInputView);
    }

    addTimeSpanInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupTimeSpanInputView);
    }

    addDropDownFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupSelectView);
    }

    addFormGroup<TView extends FormGroupView>(ctor: ViewConstructor<TView>) {
        return this.formGroupContainerView.addFormGroup<TView>(ctor);
    }
}
