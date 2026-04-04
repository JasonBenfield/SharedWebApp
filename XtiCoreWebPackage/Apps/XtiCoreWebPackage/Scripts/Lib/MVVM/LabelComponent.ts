import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { CompositeComponentView } from "./CompositeComponent";
import { IStyleableComponentView } from "./StyleableComponentView";
import { TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { Constructor, ITitleView, ITitleViewModel } from "./Types";
import { BaseUniqueComponent } from "./UniqueComponent";

export interface ILabelViewModel {
    get forID(): string;
    set forID(forID: string);
}

export type BaseLabelComponentViewModel = ComponentViewModel & ILabelViewModel & ITitleViewModel;

export function LabelViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements ILabelViewModel {
        private _forID = "";
        get forID() { return this._forID; }
        set forID(forID: string) { this._forID = forID; }
    };
}

export class LabelComponentViewModel extends LabelViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
    constructor(initializer: ComponentViewModelInitializer<LabelComponentViewModel> = {}) {
        super(initializer);
    }
}

export interface ILabelView {
    setFor(forID: string): void;
}

export function LabelViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
    return class extends Base implements ILabelView {
        setFor(forID: string) {
            this.setAttributes({ "for": forID });
        }
    };
}

export type BaseLabelComponentView = ComponentView & ITitleView & ILabelView;

export class LabelComponentView<
    TLayout extends ComponentViewLayout<TLayout>,
    TPublicLayout extends ComponentViewLayout<TPublicLayout>
> extends LabelViewMixin(CompositeComponentView)<TLayout, TPublicLayout> {
    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return LabelComponentView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new LabelComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("label", layout, toPublicLayout);
    }
}

export class LabelComponentChangeHandler extends ComponentChangeHandler<ComponentViewModel & BaseLabelComponentViewModel, ComponentView & ILabelView> {

    handleChanges(changes: ObservableChanges<ComponentViewModel & BaseLabelComponentViewModel>) {
        if (changes.forID) {
            const forID: string = changes.forID.value;
            this.updateView(v => v.setFor(forID));
        }
    }

}

export function LabelComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: BaseLabelComponentViewModel;

        private _forComponent: BaseUniqueComponent | null = null;

        forComponent(forComponent: BaseUniqueComponent | null) {
            const existingForComponent = this._forComponent;
            if (existingForComponent) {
                existingForComponent.uniqueWhen.idChanged.unregister(this.onForIDChanged.bind(this));
            }
            this._forComponent = forComponent;
            this.viewModel.forID = forComponent?.id || "";
            if (forComponent) {
                forComponent.uniqueWhen.idChanged.then(this.onForIDChanged.bind(this));
            }
        }

        private onForIDChanged(evt: CustomEventInit<string>) {
            const forID = evt.detail;
            if (forID) {
                this.viewModel.forID = forID;
            }
        }

        dispose() {
            const existingForComponent = this._forComponent;
            if (existingForComponent) {
                existingForComponent.uniqueWhen.idChanged.unregister(this.onForIDChanged.bind(this));
            }
            this._forComponent = null;
            super.dispose();
        }
    };
}

export class LabelComponent extends LabelComponentMixin(TitleComponentMixin(Component)) {
    constructor(viewModel: BaseLabelComponentViewModel, view: BaseLabelComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LabelComponentChangeHandler(viewModel, view)
        );
    }
}