import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponentView } from "./CompositeComponent";
import { InputComponent, InputComponentView, InputComponentViewModel } from "./InputComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, BaseTextComponentViewModel, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";
import { ITransformedInput, TransformedInputComponent, TransformedInputComponentViewModel } from "./TransformedInputComponent";

export interface IFormGroupView<TValueView extends ComponentView> {
    readonly caption: BaseTextComponentView;
    readonly value: TValueView;
}

export type BaseFormGroupView<TValueView extends ComponentView> = ComponentView & IFormGroupView<TValueView>;

export class FormGroupView<TValueView extends ComponentView> extends StyleableComponentViewMixin(ComponentView) implements IFormGroupView<TValueView> {
    constructor(valueView: TValueView) {
        super("div");
        this.layout = {
            captionContainer: CompositeComponentView.block({
                caption: new TextComponentView()
            }),
            valueContainer: CompositeComponentView.block({
                value: valueView
            })
        };
        this.addLayout(this.layout);
    }

    private readonly layout: {
        captionContainer: ComponentView & {
            caption: TextComponentView
        },
        valueContainer: ComponentView & {
            value: TValueView
        }
    };

    get captionContainer() { return this.layout.captionContainer; }

    get caption() { return this.layout.captionContainer.caption; }

    get valueContainer() { return this.layout.valueContainer; }

    get value() { return this.layout.valueContainer.value; }

}

export interface IFormGroupViewModel<TValue extends ComponentViewModel> {
    caption: TextComponentViewModel,
    value: TValue
}

export class FormGroupViewModel<TValueVM extends ComponentViewModel> extends ComponentViewModel implements IFormGroupViewModel<TValueVM> {
    constructor(value: TValueVM) {
        super();
        this.value = value;
    }

    readonly caption = new TextComponentViewModel();
    readonly value: TValueVM;
}

export class FormGroup<
    TValueVM extends ComponentViewModel,
    TValueView extends ComponentView,
    TValueComponent extends Component
> extends Component {
    constructor(
        viewModel: ComponentViewModel & IFormGroupViewModel<TValueVM>,
        view: BaseFormGroupView<TValueView>,
        createValueComponent: (vm: TValueVM, v: TValueView) => TValueComponent
    ) {
        super(viewModel, view);
        this.caption = new TextComponent(viewModel.caption, view.caption);
        this.value = createValueComponent(viewModel.value, view.value);
    }

    readonly caption: TextComponent;
    readonly value: TValueComponent;

    setCaption(caption: string) {
        this.caption.text = caption;
    }

}

export class FormGroupTextViewModel extends FormGroupViewModel<TextComponentViewModel> {
    constructor() {
        super(new TextComponentViewModel());
    }
}

export class FormGroupTextView extends FormGroupView<TextComponentView> {
    constructor() {
        super(new TextComponentView());
    }
}

export class FormGroupText extends FormGroup<BaseTextComponentViewModel, BaseTextComponentView, TextComponent> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<BaseTextComponentViewModel>, view: BaseFormGroupView<BaseTextComponentView>) {
        super(viewModel, view, (vm, v) => new TextComponent(vm, v));
    }

    getValue() {
        return this.value.text;
    }

    setValue(value: string) {
        this.value.text = value;
    }
}

export class FormGroupInputViewModel extends FormGroupViewModel<InputComponentViewModel> {
    constructor() {
        super(new InputComponentViewModel());
    }
}

export class FormGroupInputView extends FormGroupView<InputComponentView> {
    constructor() {
        super(new InputComponentView());
    }
}

export class FormGroupInput extends FormGroup<InputComponentViewModel, InputComponentView, InputComponent> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<InputComponentViewModel>, view: FormGroupView<InputComponentView>) {
        super(viewModel, view, (vm, v) => new InputComponent(vm, v));
    }

    getValue() {
        return this.value.textValue;
    }

    setValue(value: string) {
        this.value.textValue = value;
    }
}

export class FormGroupTransformedInputViewModel<TValue> extends FormGroupViewModel<TransformedInputComponentViewModel<TValue>> {
    constructor(initialValue: TValue) {
        super(new TransformedInputComponentViewModel(initialValue));
    }
}

export class FormGroupTransformedInput<TValue> extends FormGroup<TransformedInputComponentViewModel<TValue>, InputComponentView, TransformedInputComponent<TValue>> {
    constructor(viewModel: ComponentViewModel & IFormGroupViewModel<TransformedInputComponentViewModel<TValue>>, view: FormGroupView<InputComponentView>, transformedInput: ITransformedInput<TValue>) {
        super(viewModel, view, (vm, v) => new TransformedInputComponent(vm, v, transformedInput));
    }

    getValue() {
        return this.value.value;
    }

    setValue(value: TValue) {
        this.value.value = value;
    }
}
