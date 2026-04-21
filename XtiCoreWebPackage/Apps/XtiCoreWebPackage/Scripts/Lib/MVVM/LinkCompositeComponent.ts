import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView, CompositeComponentLayout, CompositeComponentView, CompositeComponentViewModelLayout, CompositeComponentViewModelProperties, IPublicLayoutView } from "./CompositeComponent";
import { ILinkComponent, ILinkView, ILinkViewModel, LinkComponentChangeHandler, LinkComponentMixin, LinkViewMixin, LinkViewModelMixin } from "./LinkComponent";
import { ITitleComponent, TitleChangeHandler, TitleComponentMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export class LinkCompositeComponentViewModel<TLayout extends CompositeComponentViewModelLayout<TLayout>>
    extends TitleViewModelMixin(LinkViewModelMixin(ComponentViewModel)) {

    static create<T extends CompositeComponentViewModelLayout<T>>(layout: T) {
        return new LinkCompositeComponentViewModel(layout).asLayout();
    }

    constructor(layout: TLayout) {
        super();
        const vm: any = this;
        for (const key in layout) {
            const childVM: any = layout[key];
            if (childVM && childVM instanceof ComponentViewModel) {
                vm[key] = childVM;
            }
        }
    }

    asLayout() { return this as this & TLayout; }
}

class BaseLinkCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>
    extends LinkViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

export class LinkCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>
    extends TitleViewMixin(BaseLinkCompositeComponentView)<TLayout, TPublicLayout>
    implements ILinkView, ITitleView {

    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return LinkCompositeComponentView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new LinkCompositeComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("a", layout, toPublicLayout);
    }

    declare asLayout: () => LinkCompositeComponentView<TLayout, TPublicLayout> & TLayout;
}

export class LinkCompositeComponentBuilder<TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>> {
    constructor(private readonly viewModel: ComponentViewModel & TViewModelLayout & ILinkViewModel & ITitleViewModel) {
    }

    view<TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }>(view: CompositeComponentView<any, TViewPublicLayout> & ILinkView & ITitleView) {
        return new LinkCompositeComponentBuilderWithView(this.viewModel, view);
    }
}

class LinkCompositeComponentBuilderWithView<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends {
        [K in keyof TViewLayout]: ComponentView
    },
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }
> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout & ILinkViewModel & ITitleViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & ILinkView & ITitleView
    ) {

    }

    factory<TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }>(factory: TFactory) {
        return new LinkCompositeComponentBuilderWithComponentFactory<TViewModelLayout, TViewLayout, TViewPublicLayout, TFactory>(this.viewModel, this.view, factory);
    }
}

class LinkCompositeComponentBuilderWithComponentFactory<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends {
        [K in keyof TViewLayout]: ComponentView
    },
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }, TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout & ILinkViewModel & ITitleViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & ILinkView & ITitleView,
        private readonly compositeFactory: TFactory
    ) {
    }

    build() {
        const layout = {};
        for (const key in this.viewModel) {
            const childVM: any = Reflect.get(this.viewModel, key);
            if (childVM instanceof ComponentViewModel) {
                const childView = Reflect.get(this.view.publicLayout, key);
                const createComponent = Reflect.get(this.compositeFactory, key);
                if (childView && createComponent) {
                    Reflect.set(layout, key, createComponent(childVM as any, childView));
                }
            }
        }
        return new LinkCompositeComponent(
            this.viewModel,
            this.view,
            layout as { [K in keyof TFactory]: ReturnType<TFactory[K]> }
        ).asLayout();
    }
}

class LinkCompositeComponent<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewPublicLayout extends ComponentViewLayout<TViewPublicLayout>,
    TComponentLayout extends CompositeComponentLayout<TComponentLayout>
    > extends LinkComponentMixin(TitleComponentMixin(Component))
    implements ILinkComponent, ITitleComponent {

    constructor(
        viewModel: ComponentViewModel & TViewModelLayout & ILinkViewModel & ITitleViewModel,
        view: ComponentView & IPublicLayoutView<TViewPublicLayout> & ILinkView & ITitleView,
        layout: TComponentLayout
    ) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LinkComponentChangeHandler(viewModel, view)
        );
        for (const key in layout) {
            const childComponent = Reflect.get(layout, key);
            this.addComponent(childComponent);
            Reflect.set(this, key, childComponent);
        }
    }

    asLayout() { return this as any as Component & TComponentLayout & ILinkComponent & ITitleComponent; }
}