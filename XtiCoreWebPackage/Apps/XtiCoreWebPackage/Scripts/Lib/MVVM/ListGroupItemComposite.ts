import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { CompositeComponentLayout, CompositeComponentView, CompositeComponentViewModelLayout, CompositeComponentViewModelProperties, IPublicLayoutView } from "./CompositeComponent";
import { IListGroupItem, IListGroupItemView, IListGroupItemViewModel, ListGroupItemChangeHandler, ListGroupItemMixin, ListGroupItemViewModelMixin } from "./ListGroup";

export class ListGroupItemCompositeViewModel<TLayout extends CompositeComponentViewModelLayout<TLayout>>
    extends ListGroupItemViewModelMixin(ComponentViewModel) {

    static create<T extends CompositeComponentViewModelLayout<T>>(layout: T) {
        return new ListGroupItemCompositeViewModel(layout).asLayout();
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

    asLayout() { return this as any as ListGroupItemCompositeViewModel<TLayout> & TLayout; }
}

export class ListGroupItemCompositeBuilder<TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>> {
    constructor(private readonly viewModel: ComponentViewModel & TViewModelLayout & IListGroupItemViewModel) {
    }

    view<TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }>(view: CompositeComponentView<any, TViewPublicLayout> & IListGroupItemView) {
        return new ListGroupItemCompositeBuilderWithView(this.viewModel, view);
    }
}

class ListGroupItemCompositeBuilderWithView<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends {
        [K in keyof TViewLayout]: ComponentView
    },
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }
> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout & IListGroupItemViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & IListGroupItemView
    ) {
    }

    factory<TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }>(factory: TFactory) {
        return new ListGroupItemCompositeBuilderWithComponentFactory<TViewModelLayout, TViewLayout, TViewPublicLayout, TFactory>(this.viewModel, this.view, factory);
    }
}

class ListGroupItemCompositeBuilderWithComponentFactory<
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
        private readonly viewModel: ComponentViewModel & TViewModelLayout & IListGroupItemViewModel,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout> & IListGroupItemView,
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
        return new ListGroupItemComposite(
            this.viewModel,
            this.view,
            layout as { [K in keyof TFactory]: ReturnType<TFactory[K]> }
        ).asLayout();
    }
}

class ListGroupItemComposite<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewPublicLayout extends ComponentViewLayout<TViewPublicLayout>,
    TComponentLayout extends CompositeComponentLayout<TComponentLayout>
> extends ListGroupItemMixin(Component) {

    constructor(
        viewModel: ComponentViewModel & TViewModelLayout & IListGroupItemViewModel,
        view: ComponentView & IPublicLayoutView<TViewPublicLayout> & IListGroupItemView,
        layout: TComponentLayout
    ) {
        super(
            viewModel,
            view,
            new ListGroupItemChangeHandler(viewModel, view)
        );
        for (const key in layout) {
            const childComponent = Reflect.get(layout, key);
            this.addComponent(childComponent);
            Reflect.set(this, key, childComponent);
        }
    }

    asLayout() { return this as any as Component & TComponentLayout & IListGroupItem; }
}