import { FormControlCss } from "../Bootstrap/FormGroupCss";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseFormGroupView, FormGroup, FormGroupView, FormGroupViewModel, IFormGroupViewModel } from "./FormGroup";
import { BaseInputComponentView, InputComponent, InputComponentView, InputComponentViewModel } from "./InputComponent";
import { ITransformedInput, TransformedInputComponent, TransformedInputComponentViewModel } from "./TransformedInputComponent";

export class FormGroupInputViewModel extends FormGroupViewModel<InputComponentViewModel> {
    constructor() {
        super(new InputComponentViewModel());
    }
}

export class FormGroupInputView extends FormGroupView<InputComponentView> {
    constructor() {
        super(new InputComponentView());
        this.publicLayout.value.setCss(this.formControlCss);
    }

    private readonly formControlCss = FormControlCss.control();

    setFormControlCss(configure: (css: FormControlCss) => void) {
        configure(this.formControlCss);
        this.publicLayout.value.setCss(this.formControlCss);
        return this;
    }
}

export class FormGroupInput extends FormGroup<InputComponentViewModel, BaseInputComponentView, InputComponent> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<InputComponentViewModel>, view: BaseFormGroupView<BaseInputComponentView>) {
        super(viewModel, view, (vm, v) => new InputComponent(vm, v));
    }


    readonly when = this.value.when;

    getValue() {
        return this.value.textValue;
    }

    setValue(value: string) {
        this.value.textValue = value;
    }

    setFocus() {
        this.value.setFocus();
    }
}

export class FormGroupTransformedInputViewModel<TValue> extends FormGroupViewModel<TransformedInputComponentViewModel<TValue>> {
    constructor(initialValue: TValue) {
        super(new TransformedInputComponentViewModel(initialValue));
    }
}

export class FormGroupTransformedInput<TValue> extends FormGroup<TransformedInputComponentViewModel<TValue>, BaseInputComponentView, TransformedInputComponent<TValue>> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<TransformedInputComponentViewModel<TValue>>, view: BaseFormGroupView<BaseInputComponentView>, transformedInput: ITransformedInput<TValue>) {
        super(viewModel, view, (vm, v) => new TransformedInputComponent(vm, v, transformedInput));
    }

    readonly when = this.value.when;

    getValue() {
        return this.value.value;
    }

    setValue(value: TValue) {
        this.value.value = value;
    }

    setFocus() {
        this.value.setFocus();
    }
}
