import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { StyleableComponentView } from "./StyleableComponentView";
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
}

export interface ILinkView {
    setHref(href: string): void;
    setTarget(target: string): void;
}

export function LinkViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
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
    TLayout extends ComponentViewLayout<TLayout>,
    TPublicLayout extends ComponentViewLayout<TPublicLayout>
> extends LinkViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return LinkComponentView.createWithPublicLayout(layout, l => Object.assign({}, l));
    }

    static createWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new LinkComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => LinkComponentView<TLayout, TPublicLayout> & TLayout;
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