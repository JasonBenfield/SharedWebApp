import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { StyleableComponentView } from "./StyleableComponentView";
import { ITitleComponent, TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { Constructor, ITitleView, ITitleViewModel } from "./Types";

export type LinkTargetType = "" | "_blank";

export interface ILinkViewModel {
    get href(): string;
    set href(href: string);

    get target(): string;
    set target(target: string);
}

export type BaseLinkComponentViewModel = ComponentViewModel & ILinkViewModel & ITitleViewModel;

export function LinkViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T): T & Constructor<ILinkViewModel> {
    return class extends Base {
        private _href = "";
        get href() { return this._href; }
        set href(href: string) { this._href = href; }

        private _target: LinkTargetType = "";
        get target() { return this._target; }
        set target(target: LinkTargetType) { this._target = target; }
    };
}

export class LinkComponentViewModel extends LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
}

export interface ILinkView {
    setHref(href: string): void;
    setTarget(target: string): void;
}

export function LinkViewMixin<T extends Constructor<StyleableComponentView>>(Base: T): T & Constructor<ILinkView> {
    return class extends Base {
        setHref(href: string) {
            this.setAttributes({ "href": href });
        }

        setTarget(target: string) {
            this.setAttributes({ "target": target === "" ? null : target });
        }
    };
}

export type BaseLinkComponentView = ComponentView & ITitleView & ILinkView;

export class LinkComponentChangeHandler extends ComponentChangeHandler<ComponentViewModel & BaseLinkComponentViewModel, ComponentView & ILinkView> {

    handleChanges(changes: ObservableChanges<ComponentViewModel & BaseLinkComponentViewModel>) {
        if (changes.href) {
            const href = changes.href.value;
            this.updateView(v => v.setHref(href));
        }
        if (changes.target) {
            const target = changes.target.value;
            this.updateView(v => v.setTarget(target));
        }
    }

}

export interface ILinkComponent {
    get href(): string;
    set href(href: string);

    get isTargetBlank(): boolean;

    setTargetToBlank(): void;
    setTargetToDefault(): void;
}

export function LinkComponentMixin<T extends Constructor<Component>>(Base: T): T & Constructor<ILinkComponent> {
    return class extends Base {
        declare protected readonly viewModel: BaseLinkComponentViewModel;

        get href() { return this.viewModel.href; }

        set href(href: string) {
            this.viewModel.href = href;
        }

        get isTargetBlank() { return this.viewModel.target === "_blank"; }

        setTargetToBlank() {
            this.viewModel.target = "_blank";
        }

        setTargetToDefault() {
            this.viewModel.target = "";
        }
    };
}

export class LinkComponent
    extends LinkComponentMixin(TitleComponentMixin(Component))
    implements ILinkComponent, ITitleComponent {

    constructor(viewModel: BaseLinkComponentViewModel, view: BaseLinkComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LinkComponentChangeHandler(viewModel, view)
        );
    }
}