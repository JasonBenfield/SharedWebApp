import { IComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponent, CompositeComponentView } from "./CompositeComponent";
import { ITextComponentView, TextComponentView, TextComponentViewModel } from "./TextComponent";

export interface IReadonlyFormGroupView {
    readonly caption: ITextComponentView;
    readonly value: ITextComponentView;
}

function createLayout() {
    return {
        captionContainer: CompositeComponentView.block()
            .compose({
                caption: TextComponentView.block()
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

export class ReadonlyFormGroupView extends CompositeComponentView {
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

    createComponent(view: IComponentView): ReadonlyFormGroup {
        return new ReadonlyFormGroup(this, view);
    }
}

export class ReadonlyFormGroup extends CompositeComponent<ComponentViewModel & IReadonlyFormGroupViewModel> {
    constructor(viewModel: ComponentViewModel & IReadonlyFormGroupViewModel, view: IComponentView) {
        super(viewModel, view);
    }

    setCaption(caption: string) {
        this.composite.caption.text = caption;
    }

    setValue(value: string) {
        this.composite.value.text = value;
    }
}