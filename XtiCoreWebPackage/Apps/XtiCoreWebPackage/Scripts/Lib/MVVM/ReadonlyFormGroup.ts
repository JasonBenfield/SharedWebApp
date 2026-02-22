import { ChildViewManager } from "./ChildViewManager";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponent } from "./CompositeComponent";
import { ContainerView } from "./ContainerView";
import { StyleableComponentView } from "./StyleableComponentView";
import { ITextComponentView, TextComponent, TextComponentView, TextComponentViewModel } from "./TextComponent";

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
        this._childViewManager = new ChildViewManager();
        this.captionBlockView = this._childViewManager.addChildView(ContainerView.block());
        this.caption = this.captionBlockView.addChildView(TextComponentView.label());
        this.valueBlockView = this._childViewManager.addChildView(ContainerView.block());
        this.value = this.valueBlockView.addChildView(TextComponentView.block());
    }

    addToDom(parent: HTMLElement) {
        super.addToDom(parent);
        this._childViewManager.addChildViewsToDom(this.element);
    }

    removeFromDom() {
        this._childViewManager.removeChildViewsFromDom();
        super.removeFromDom();
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
        viewModel: ReadonlyFormGroupViewModel,
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
        this.layout.caption.text = caption;
    }

    setValue(value: string) {
        this.layout.value.text = value;
    }
}