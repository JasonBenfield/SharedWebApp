import { AlertComponentChangeHandler, AlertComponentMixin, AlertViewMixin, AlertViewModelMixin, IAlertView, IAlertViewModel } from "./AlertComponent";
import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseCompositeComponentView, CompositeComponentLayout, CompositeComponentView, CompositeComponentViewModelLayout, CompositeComponentViewModelProperties } from "./CompositeComponent";

export class AlertCompositeComponentViewModel<TLayout extends CompositeComponentViewModelLayout<TLayout>>
    extends AlertViewModelMixin(ComponentViewModel) {

    static create<T extends CompositeComponentViewModelLayout<T>>(layout: T) {
        return new AlertCompositeComponentViewModel(layout).asLayout();
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

export class AlertCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>
    extends AlertViewMixin(BaseCompositeComponentView)<TLayout, TPublicLayout>
    implements IAlertView {

    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return AlertCompositeComponentView.blockeWithPublicLayout(layout, l => l);
    }

    static blockeWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new AlertCompositeComponentView("div", layout, toPublicLayout).asLayout();
    }

    declare asLayout: () => AlertCompositeComponentView<TLayout, TPublicLayout> & TLayout;
}

export class AlertCompositeComponentBuilder<TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>> {
    constructor(private readonly viewModel: ComponentViewModel & TViewModelLayout & IAlertViewModel) {
    }

    view<TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }>(view: CompositeComponentView<any, TViewPublicLayout> & IAlertView) {
        return new AlertCompositeComponentBuilderWithView(this.viewModel, view);
    }
}

class AlertCompositeComponentBuilderWithView<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends {
        [K in keyof TViewLayout]: ComponentView
    },
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }
> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout & IAlertViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & IAlertView
    ) {
    }

    factory<TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }>(factory: TFactory) {
        return new AlertCompositeComponentBuilderWithComponentFactory<TViewModelLayout, TViewLayout, TViewPublicLayout, TFactory>(this.viewModel, this.view, factory);
    }
}

class AlertCompositeComponentBuilderWithComponentFactory<
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
        private readonly viewModel: ComponentViewModel & TViewModelLayout & IAlertViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & IAlertView,
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
        return new AlertCompositeComponent(
            this.viewModel,
            this.view,
            layout as { [K in keyof TFactory]: ReturnType<TFactory[K]> }
        ).asLayout();
    }
}

class AlertCompositeComponent<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewPublicLayout extends ComponentViewLayout<TViewPublicLayout>,
    TComponentLayout extends CompositeComponentLayout<TComponentLayout>
> extends AlertComponentMixin(Component) {

    constructor(
        viewModel: ComponentViewModel & TViewModelLayout & IAlertViewModel,
        view: ComponentView & IPublicLayoutView<TViewPublicLayout> & IAlertView,
        layout: TComponentLayout
    ) {
        super(
            viewModel,
            view,
            new AlertComponentChangeHandler(viewModel, view)
        );
        for (const key in layout) {
            const childComponent = Reflect.get(layout, key);
            this.addComponent(childComponent);
            Reflect.set(this, key, childComponent);
        }
    }

    asLayout() { return this as any as Component & TComponentLayout & ILinkComponent & ITitleComponent; }
}