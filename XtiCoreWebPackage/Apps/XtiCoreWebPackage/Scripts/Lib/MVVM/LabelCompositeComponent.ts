import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView, CompositeComponentLayout, CompositeComponentView, CompositeComponentViewModelLayout, CompositeComponentViewModelProperties, IPublicLayoutView } from "./CompositeComponent";
import { ILabelComponent, ILabelView, ILabelViewModel, LabelComponentChangeHandler, LabelComponentMixin, LabelViewMixin, LabelViewModelMixin } from "./LabelComponent";
import { ITitleComponent, TitleChangeHandler, TitleComponentMixin, TitleViewMixin, TitleViewModelMixin } from "./TextComponent";
import { ITitleView, ITitleViewModel } from "./Types";

export class LabelCompositeComponentViewModel<TLayout extends CompositeComponentViewModelLayout<TLayout>> extends TitleViewModelMixin(LabelViewModelMixin(ComponentViewModel)) {
    static create<T extends CompositeComponentViewModelLayout<T>>(layout: T) {
        return new LabelCompositeComponentViewModel(layout).asLayout();
    }

    constructor(layout: TLayout) {
        super();
        for (const key in layout) {
            const childVM: any = Reflect.get(layout, key);
            if (childVM && childVM instanceof ComponentViewModel) {
                Reflect.set(this, key, childVM);
            }
        }
    }

    asLayout() { return this as any as LabelCompositeComponentViewModel<TLayout> & TLayout; }
}

class BaseLabelCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>
    extends LabelViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout> {
}

export class LabelCompositeComponentView<
    TLayout extends ComponentViewLayout<TLayout>,
    TPublicLayout extends ComponentViewLayout<TPublicLayout>
>
    extends TitleViewMixin(BaseLabelCompositeComponentView)<TLayout, TPublicLayout>
    implements ILabelView, ITitleView {

    static create<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return LabelCompositeComponentView.createWithPublicLayout(layout, l => l);
    }

    static createWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new LabelCompositeComponentView(layout, toPublicLayout).asLayout();
    }

    constructor(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        super("label", layout, toPublicLayout);
    }

    declare asLayout: () => LabelCompositeComponentView<TLayout, TPublicLayout> & TLayout;
}

export class LabelCompositeComponentBuilder<TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>> {
    constructor(private readonly viewModel: ComponentViewModel & TViewModelLayout & ILabelViewModel & ITitleViewModel) {
    }

    view<TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }>(view: CompositeComponentView<any, TViewPublicLayout> & ILabelView & ITitleView) {
        return new LabelCompositeComponentBuilderWithView(this.viewModel, view);
    }
}

class LabelCompositeComponentBuilderWithView<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends {
        [K in keyof TViewLayout]: ComponentView
    },
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }
> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout & ILabelViewModel & ITitleViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & ILabelView & ITitleView
    ) {

    }

    factory<TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }>(factory: TFactory) {
        return new LabelCompositeComponentBuilderWithComponentFactory<TViewModelLayout, TViewLayout, TViewPublicLayout, TFactory>(this.viewModel, this.view, factory);
    }
}

class LabelCompositeComponentBuilderWithComponentFactory<
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
        private readonly viewModel: ComponentViewModel & TViewModelLayout & ILabelViewModel & ITitleViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & ILabelView & ITitleView,
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
        return new LabelCompositeComponent(
            this.viewModel,
            this.view,
            layout as { [K in keyof TFactory]: ReturnType<TFactory[K]> }
        ).asLayout();
    }
}

class LabelCompositeComponent<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewPublicLayout extends ComponentViewLayout<TViewPublicLayout>,
    TComponentLayout extends CompositeComponentLayout<TComponentLayout>
>
    extends LabelComponentMixin(TitleComponentMixin(Component))
    implements ILabelComponent, ITitleComponent {

    constructor(
        viewModel: ComponentViewModel & TViewModelLayout & ILabelViewModel & ITitleViewModel,
        view: ComponentView & IPublicLayoutView<TViewPublicLayout> & ILabelView & ITitleView,
        layout: TComponentLayout
    ) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new LabelComponentChangeHandler(viewModel, view)
        );
        for (const key in layout) {
            const childComponent = Reflect.get(layout, key);
            this.addComponent(childComponent);
            Reflect.set(this, key, childComponent);
        }
    }

    asLayout() { return this as any as Component & TComponentLayout & ILabelComponent & ITitleComponent; }
}