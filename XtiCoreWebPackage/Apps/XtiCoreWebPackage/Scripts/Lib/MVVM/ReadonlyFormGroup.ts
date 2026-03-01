import { IComponentFactory } from "./ComponentFactory";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponent, CompositeComponentLayout, CompositeComponentView, CompositeComponentViewMixin } from "./CompositeComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, TextComponentView, TextComponentViewModel } from "./TextComponent";

export interface IReadonlyFormGroupView {
    readonly caption: BaseTextComponentView;
    readonly value: BaseTextComponentView;
}

export type BaseReadonlyFormGroupView = ComponentView & IReadonlyFormGroupView;

function createLayout() {
    return {
        captionContainer: CompositeComponentView.block()
            .compose({
                caption: TextComponentView.label()
            }),
        valueContainer: CompositeComponentView.block()
            .compose({
                value: TextComponentView.block()
            })
    };
}

function toPublicLayout(layout: ReturnType<typeof createLayout>) {
    const formGroup: IReadonlyFormGroupView = {
        caption: layout.captionContainer.caption,
        value: layout.valueContainer.value
    };
    return formGroup;
}

export class ReadonlyFormGroupView extends CompositeComponentViewMixin(StyleableComponentViewMixin(ComponentView)) {
    static create() {
        return new ReadonlyFormGroupView().compose();
    }

    private constructor() {
        super("div");
    }

    compose() {
        return super.compose(createLayout(), toPublicLayout);
    }

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

export class ReadonlyFormGroup extends CompositeComponent<ComponentViewModel & IReadonlyFormGroupViewModel> {
    static create(viewModel: ComponentViewModel & IReadonlyFormGroupViewModel, view: BaseReadonlyFormGroupView) {
        return new ReadonlyFormGroup(viewModel, view) as ReadonlyFormGroup & CompositeComponentLayout<ComponentViewModel & IReadonlyFormGroupViewModel>;
    }

    private readonly composition: CompositeComponentLayout<ComponentViewModel & IReadonlyFormGroupViewModel>;

    constructor(viewModel: ComponentViewModel & IReadonlyFormGroupViewModel, view: BaseReadonlyFormGroupView) {
        super(viewModel, view);
        this.composition = (<any>this) as CompositeComponentLayout<ComponentViewModel & IReadonlyFormGroupViewModel>;
    }

    setCaption(caption: string) {
        this.composition.caption.text = caption;
    }

    setValue(value: string) {
        this.composition.value.text = value;
    }
}

export class ReadonlyFormGroupComponentFactory implements IComponentFactory {
    create(viewModel: ComponentViewModel & IReadonlyFormGroupViewModel, view: BaseReadonlyFormGroupView) {
        return new ReadonlyFormGroup(viewModel, view);
    }
}