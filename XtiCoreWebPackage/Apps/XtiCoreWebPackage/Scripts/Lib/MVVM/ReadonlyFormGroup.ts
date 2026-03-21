import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponentViewBuilder, CompositeComponentViewModelLayout } from "./CompositeComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";

export interface IReadonlyFormGroupView {
    readonly caption: BaseTextComponentView;
    readonly value: BaseTextComponentView;
}

export type BaseReadonlyFormGroupView = ComponentView & IReadonlyFormGroupView;

export class ReadonlyFormGroupView extends StyleableComponentViewMixin(ComponentView) implements IReadonlyFormGroupView {
    constructor() {
        super("div");
        this.addLayout(this.layout);
    }

    private readonly layout = {
        captionContainer: CompositeComponentViewBuilder.block().build({
            caption: TextComponentView.label()
        }).asLayout(),
        valueContainer: CompositeComponentViewBuilder.block().build({
            value: TextComponentView.block()
        }).asLayout()
    };

    get captionContainer() { return this.layout.captionContainer; }

    get caption() { return this.layout.captionContainer.caption; }

    get valueContainer() { return this.layout.valueContainer; }

    get value() { return this.layout.valueContainer.value; }

}

export interface IReadonlyFormGroupViewModel {
    caption: TextComponentViewModel,
    value: TextComponentViewModel
}

export class ReadonlyFormGroupViewModel extends ComponentViewModel implements IReadonlyFormGroupViewModel {
    readonly caption: TextComponentViewModel;
    readonly value: TextComponentViewModel;

    constructor() {
        super();
        this.caption = new TextComponentViewModel();
        this.value = new TextComponentViewModel();
    }
}

export class ReadonlyFormGroup extends Component {
    static create(viewModel: ComponentViewModel & IReadonlyFormGroupViewModel, view: BaseReadonlyFormGroupView) {
        return new ReadonlyFormGroup(viewModel, view) as ReadonlyFormGroup & CompositeComponentViewModelLayout<ComponentViewModel & IReadonlyFormGroupViewModel>;
    }

    constructor(viewModel: ComponentViewModel & IReadonlyFormGroupViewModel, view: BaseReadonlyFormGroupView) {
        super(viewModel, view);
        this.caption = new TextComponent(viewModel.caption, view.caption);
        this.value = new TextComponent(viewModel.value, view.value);
    }

    readonly caption: TextComponent;
    readonly value: TextComponent;

    setCaption(caption: string) {
        this.caption.text = caption;
    }

    setValue(value: string) {
        this.value.text = value;
    }
}
