import { ChildViewManager } from "./ChildViewManager";
import { CompositeComponent } from "./CompositeComponent";
import { ContainerView } from "./ContainerView";
import { StyleableComponentView } from "./StyleableComponentView";
import { TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";
import { IComponentView, ITextComponentView } from "./Types";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";

export interface IReadonlyFormGroupView extends IComponentView {
    readonly caption: ITextComponentView;
    readonly value: ITextComponentView;
}

export class ReadonlyFormGroupView extends StyleableComponentView implements IReadonlyFormGroupView {
    private readonly _childViewManager: ChildViewManager;
    readonly captionBlockView: ContainerView;
    readonly caption: TextComponentView;
    readonly valueBlockView: ContainerView;
    readonly value: TextComponentView;

    constructor() {
        super(() => document.createElement("div"));
        this._childViewManager = new ChildViewManager(this);
        this.captionBlockView = this._childViewManager.addChildView(ContainerView.block());
        this.caption = this.captionBlockView.addChildView(TextComponentView.label());
        this.valueBlockView = this._childViewManager.addChildView(ContainerView.block());
        this.value = this.valueBlockView.addChildView(TextComponentView.block());
    }
}

export class ReadonlyFormGroupViewModel extends ComponentViewModel {
    readonly caption = new TextComponentViewModel();
    readonly value = new TextComponentViewModel();
}

export interface IReadonlyFormGroup {
    readonly caption: TextComponent;
    readonly value: TextComponent;
}

export class ReadonlyFormGroup extends CompositeComponent<IReadonlyFormGroup> {
    constructor(
        protected readonly viewModel: ReadonlyFormGroupViewModel,
        view: IReadonlyFormGroupView
    ) {
        super(
            viewModel,
            view,
            {
                caption: new TextComponent(viewModel.caption, view.caption),
                value: new TextComponent(viewModel.value, view.value)
            }
        );
    }

    setCaption(caption: string) {
        this.viewModel.caption.text = caption;
    }

    setValue(value: string) {
        this.viewModel.value.text = value;
    }
}