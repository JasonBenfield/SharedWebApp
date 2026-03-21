import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { CompositeComponentView } from "./CompositeComponent";
import { IStyleableComponentView } from "./StyleableComponentView";
import { TitleChangeHandler, TitleComponentMixin, TitleViewModelMixin } from "./TextComponent";
import { Constructor, ITitleView, ITitleViewModel } from "./Types";

export type LinkTargetType = "" | "_blank";

export interface ILinkViewModel {
    get href(): string;
    set href(href: string);

    get target(): string;
    set target(target: string);
}

export type BaseLinkComponentViewModel = ComponentViewModel & ILinkViewModel & ITitleViewModel;

export function LinkViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements ILinkViewModel {
        private _href = "";
        get href() { return this._href; }
        set href(href: string) { this._href = href; }

        private _target: LinkTargetType = "";
        get target() { return this._target; }
        set target(target: LinkTargetType) { this._target = target; }
    };
}

export class LinkComponentViewModel extends LinkViewModelMixin(TitleViewModelMixin(ComponentViewModel)) {
    constructor(initializer: ComponentViewModelInitializer<LinkComponentViewModel> = {}) {
        super(initializer);
    }

    createComponent(view: BaseLinkComponentView) {
        return new LinkComponent(this, view);
    }
}

export interface ILinkView {
    setHref(href: string): void;
    setTarget(target: string | null): void;
}

export function LinkViewMixin<T extends Constructor<ComponentView & IStyleableComponentView>>(Base: T) {
    return class extends Base implements ILinkView {
        setHref(href: string) {
            this.setAttributes({ "href": href });
        }

        setTarget(target: string) {
            this.setAttributes({ "target": target === "" ? null : target });
        }
    };
}

export type BaseLinkComponentView = ComponentView & ITitleView & ILinkView;

export class LinkComponentView<
    TLayout extends IComponentViewLayout,
    TPublicLayout extends IComponentViewLayout
    > extends LinkViewMixin(CompositeComponentView)<TLayout, TPublicLayout> {
    static create<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new LinkComponentView(layout, l => Object.assign({}, l)).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }
}

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

export function LinkComponentMixin<T extends Constructor<Component>>(Base: T) {
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

export class LinkComponent extends LinkComponentMixin(TitleComponentMixin(Component)) {
    constructor(viewModel: BaseLinkComponentViewModel, view: BaseLinkComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LinkComponentChangeHandler(viewModel, view)
        );
    }
}