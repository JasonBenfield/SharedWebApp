import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { StyleableComponentView } from "./StyleableComponentView";
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
}

export interface ILabelView {
    setFor(forID: string): void;
}

export function LabelViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base implements ILabelView {
        setFor(forID: string) {
            this.setAttributes({ "for": forID });
        }
    };
}

export type BaseLabelComponentView = ComponentView & ITitleView & ILabelView;

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
                existingForComponent.whenUnique.idChanged.unregister(this.onForIDChanged.bind(this));
            }
            this._forComponent = forComponent;
            this.viewModel.forID = forComponent?.id || "";
            if (forComponent) {
                forComponent.whenUnique.idChanged.then(this.onForIDChanged.bind(this));
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
                existingForComponent.whenUnique.idChanged.unregister(this.onForIDChanged.bind(this));
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
