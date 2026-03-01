import { Component, IComponentChangeHandler } from "./Component";
import { IComponentFactory } from "./ComponentFactory";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { CompositeComponentViewMixin } from "./CompositeComponent";
import { IStyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
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

export function LinkViewMixin<T extends Constructor<IStyleableComponentView>>(Base: T) {
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

export class LinkComponentView extends CompositeComponentViewMixin(LinkViewMixin(StyleableComponentViewMixin(ComponentView))) {
    constructor() {
        super("a");
    }
}

export class LinkComponentChangeHandler implements IComponentChangeHandler {
    constructor(private readonly view: ILinkView) {
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & BaseLinkComponentViewModel>) {
        if (changes.href) {
            this.view.setHref(changes.href.value);
        }
        if (changes.target) {
            this.view.setTarget(changes.target.value);
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
    constructor(
        protected readonly viewModel: BaseLinkComponentViewModel,
        protected readonly view: BaseLinkComponentView
    ) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(view),
            new LinkComponentChangeHandler(view)
        );
    }
}

export class LinkComponentFactory implements IComponentFactory {
    create(viewModel: BaseLinkComponentViewModel, view: BaseLinkComponentView) {
        return new LinkComponent(viewModel, view);
    }
}