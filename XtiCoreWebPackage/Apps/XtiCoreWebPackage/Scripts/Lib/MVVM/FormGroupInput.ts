import { FormControlCss } from "../Bootstrap/FormGroupCss";
import { DateOnly } from "../DateOnly";
import { ComponentViewModel } from "./ComponentViewModel";
import { DateInputComponent, DateInputComponentViewModel } from "./DateInputComponent";
import { BaseFormGroupView, FormGroup, FormGroupView, FormGroupViewModel, IFormGroupViewModel } from "./FormGroup";
import { BaseInputComponentView, InputComponent, InputComponentView, InputComponentViewModel } from "./InputComponent";
import { NumericTextInputComponent, NumericTextInputComponentViewModel, TransformedNumberInput } from "./NumericTextInputComponent";
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

export class FormGroupDateInputViewModel extends FormGroupViewModel<TransformedInputComponentViewModel<DateOnly>> {
    constructor() {
        super(new DateInputComponentViewModel());
    }
}

export class FormGroupDateInput extends FormGroup<TransformedInputComponentViewModel<DateOnly>, BaseInputComponentView, TransformedInputComponent<DateOnly>> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<TransformedInputComponentViewModel<DateOnly>>, view: BaseFormGroupView<BaseInputComponentView>) {
        super(viewModel, view, (vm, v) => new DateInputComponent(vm, v));
    }

    readonly when = this.value.when;

    getValue() {
        return this.value.value;
    }

    setValue(value: DateOnly) {
        this.value.value = value;
    }

    setFocus() {
        this.value.setFocus();
    }
}

export class FormGroupNumericTextInputViewModel extends FormGroupViewModel<TransformedInputComponentViewModel<number>> {
    constructor() {
        super(new NumericTextInputComponentViewModel());
    }
}

export class FormGroupNumericTextInput extends FormGroup<TransformedInputComponentViewModel<number>, BaseInputComponentView, TransformedInputComponent<number>> {
    constructor(
        viewModel: ComponentViewModel & IFormGroupViewModel<TransformedInputComponentViewModel<number>>,
        view: BaseFormGroupView<BaseInputComponentView>,
        transformedInput = new TransformedNumberInput()) {
        super(viewModel, view, (vm, v) => new NumericTextInputComponent(vm, v, transformedInput));
    }

    readonly when = this.value.when;

    getValue() {
        return this.value.value;
    }

    setValue(value: number) {
        this.value.value = value;
    }

    setFocus() {
        this.value.setFocus();
    }
}