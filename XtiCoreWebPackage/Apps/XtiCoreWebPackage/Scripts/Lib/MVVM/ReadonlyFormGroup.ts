import { Component } from "./Component";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel, IComponentFactory } from "./ComponentViewModel";
import { CompositeComponentView } from "./CompositeComponent";
import { ITextComponentView, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";

export interface IReadonlyFormGroupView {
    readonly caption: ITextComponentView;
    readonly value: ITextComponentView;
}

function createLayout() {
    return {
        captionContainer: CompositeComponentView.block({
            caption: TextComponentView.block()
        }),
        valueContainer: CompositeComponentView.block({
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

export class ReadonlyFormGroupView {
    static create() {
        return CompositeComponentView.block(
            createLayout(),
            toPublicLayout
        );
    }
}

class ReadonlyFormGroupFactory implements IComponentFactory {
    create(viewModel: ReadonlyFormGroupViewModel, view: IComponentView & IReadonlyFormGroupView) {
        return new ReadonlyFormGroup(viewModel, view);
    }

}

export class ReadonlyFormGroupViewModel extends ComponentViewModel {
    constructor() {
        super();
        this.setComponentFactory(new ReadonlyFormGroupFactory());
    }

    readonly caption = new TextComponentViewModel();
    readonly value = new TextComponentViewModel();

    declare createComponent: (view: IComponentView & IReadonlyFormGroupView) => ReadonlyFormGroup;
}

export interface IReadonlyFormGroup {
    readonly caption: TextComponent;
    readonly value: TextComponent;
}

export class ReadonlyFormGroup extends Component {
    constructor(viewModel: ReadonlyFormGroupViewModel, view: IComponentView & IReadonlyFormGroupView) {
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