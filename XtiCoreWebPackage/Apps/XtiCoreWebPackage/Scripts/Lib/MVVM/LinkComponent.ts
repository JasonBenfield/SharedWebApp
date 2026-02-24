import { Component, IComponentChangeHandler } from "./Component";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, IComponentFactory, ObservableChanges } from "./ComponentViewModel";
import { CompositeComponentView, CompositeViewModelTemplate, ICompositeComponentView, ViewLayout } from "./CompositeComponent";
import { ContainerComponentView } from "./ContainerView";
import { TitleChangeHandler } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export type LinkTargetType = "" | "_blank";

export interface ILinkViewModel {
    get href(): string;
    set href(href: string);

    get target(): string;
    set target(target: string);
}

export type ILinkComponentViewModel = ComponentViewModel & ILinkViewModel & ITitleViewModel;

class LinkComponentFactory implements IComponentFactory {
    create(viewModel: LinkComponentViewModel, view: ILinkComponentView) {
        return new LinkComponent(viewModel, view);
    }
}

export class LinkComponentViewModel extends ComponentViewModel implements ITitleViewModel, ILinkViewModel {
    constructor(initializer: ComponentViewModelInitializer<LinkComponentViewModel> = {}) {
        super(initializer);
        this.setComponentFactory(new LinkComponentFactory());
    }

    private _href = "";
    get href() { return this._href; }
    set href(href: string) { this._href = href; }

    private _target: LinkTargetType = "";
    get target() { return this._target; }
    set target(target: LinkTargetType) { this._target = target; }

    private _title = "";
    get title() { return this._title; }
    set title(title: string) { this._title = title; }

    declare createComponent: (view: ILinkComponentView) => LinkComponent;
}

export interface ILinkView {
    setHref(href: string): void;
    setTarget(target: string | null): void;
}

export type ILinkComponentView = IComponentView & ILinkView & ITitleView;

export class LinkComponentView<TLayout, TPublicLayout> extends CompositeComponentView<TLayout, TPublicLayout> implements ILinkComponentView {
    static create<TLayout extends CompositeViewModelTemplate<TLayout>>(
        layout: ViewLayout<TLayout>
    ): ICompositeComponentView<TLayout, TLayout> & ILinkView;
    static create<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout: (layout: TLayout) => TPublicLayout
    ): ICompositeComponentView<TLayout, TPublicLayout> & ILinkView;
    static create<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout?: (layout: TLayout) => TPublicLayout
    ) {
        const view: any = new LinkComponentView(
            layout,
            toPublicLayout || ((l) => l as TPublicLayout)
        );
        return view as ICompositeComponentView<TLayout, TPublicLayout> & ILinkView;
    }

    constructor(
        layout: TLayout,
        toPublicLayout: (layout: TLayout) => TPublicLayout = ((l: TLayout) => (<any>l) as TPublicLayout)
    ) {
        super(() => document.createElement("a"), layout, toPublicLayout);
    }

    declare setTitle: (title: string) => void;

    setHref(href: string) {
        this.setAttribute("href", href);
    }

    setTarget(target: string) {
        this.setAttribute("target", target === "" ? null : target);
    }
}

export class LinkComponentChangeHandler implements IComponentChangeHandler {
    constructor(private readonly view: ILinkComponentView) {
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & ILinkComponentViewModel>) {
        if (changes.href) {
            this.view.setHref(changes.href.value);
        }
        if (changes.target) {
            this.view.setTarget(changes.target.value);
        }
    }

}

export class LinkComponent extends Component {
    constructor(
        protected readonly viewModel: ILinkComponentViewModel,
        protected readonly view: ILinkComponentView
    ) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(view),
            new LinkComponentChangeHandler(view)
        );
    }

    get href() { return this.viewModel.href; }

    set href(href: string) {
        this.viewModel.href = href;
    }

    get title() { return this.viewModel.title; }

    set title(title: string) {
        this.viewModel.title = title;
    }

    get isTargetBlank() { return this.viewModel.target === "_blank"; }

    setTargetToBlank() {
        this.viewModel.target = "_blank";
    }

    setTargetToDefault() {
        this.viewModel.target = "";
    }
}