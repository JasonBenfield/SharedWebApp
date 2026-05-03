import { Component } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ExcludedViewModelProperties } from "./ComponentViewModel";
import { IStyleableComponentView, StyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";

export type CompositeComponentViewModelProperties<TViewModel> = {
    [K in keyof TViewModel]: TViewModel[K] extends ExcludedViewModelProperties ? never :
    TViewModel[K] extends "asLayout" ? never :
    TViewModel[K] extends ComponentViewModel ? K : never;
}[keyof TViewModel];

export type CompositeComponentViewModelLayout<T> = {
    [Key in CompositeComponentViewModelProperties<T>]: T[Key];
}

export class CompositeComponentViewModel<T extends CompositeComponentViewModelLayout<T>> extends ComponentViewModel {
    static create<T extends CompositeComponentViewModelLayout<T>>(layout: T) {
        return new CompositeComponentViewModel(layout).asLayout();
    }

    constructor(layout: T) {
        super();
        for (const key in layout) {
            const childVM: any = Reflect.get(layout, key);
            if (childVM && childVM instanceof ComponentViewModel) {
                Reflect.set(this, key, childVM);
            }
        }
    }

    asLayout() { return this as this & T; }
}

export interface IPublicLayoutView<TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> {
    readonly publicLayout: TPublicLayout;
}

export class BaseCompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>
    extends StyleableComponentView
    implements IPublicLayoutView<TPublicLayout> {

    constructor(
        tagNameOrCreateElement: string | (() => HTMLElement),
        layout: TLayout,
        toPublicLayout: (l: TLayout) => TPublicLayout
    ) {
        if (typeof tagNameOrCreateElement === "string") {
            super(tagNameOrCreateElement);
        }
        else {
            super(tagNameOrCreateElement);
        }
        this.addLayout(layout);
        this._publicLayout = toPublicLayout(layout);
        for (const key in layout) {
            if (Reflect.get(this, key)) {
                throw new Error(`${this.constructor.name} already has property '${key}'.`);
            }
            const childView = Reflect.get(layout, key);
            Reflect.set(this, key, childView);
        }
    }

    private readonly _publicLayout: TPublicLayout;

    get publicLayout() { return this._publicLayout; }

    asLayout() {
        return this as any as ComponentView & IStyleableComponentView & IPublicLayoutView<TPublicLayout> & TLayout;
    }
}

export class CompositeComponentView<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>> extends BaseCompositeComponentView<TLayout, TPublicLayout> {
    static block<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return CompositeComponentView.blockWithPublicLayout(layout, l => l);
    }

    static blockWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new CompositeComponentView(
            "div",
            layout,
            toPublicLayout
        ).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return CompositeComponentView.spanWithPublicLayout(layout, l => l);
    }

    static spanWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new CompositeComponentView(
            "span", layout, toPublicLayout
        ).asLayout();
    }

    static heading<TLayout extends ComponentViewLayout<TLayout>>(size: 1 | 2 | 3 | 4 | 5 | 6, layout: TLayout) {
        return CompositeComponentView.headingWithPublicLayout(
            size, layout, l => l
        );
    }

    static headingWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(size: 1 | 2 | 3 | 4 | 5 | 6, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new CompositeComponentView(
            `h${size}`, layout, toPublicLayout
        ).asLayout();
    }

    static listItem<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) {
        return CompositeComponentView.listItemWithPublicLayout(layout, l => l);
    }

    static listItemWithPublicLayout<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends ComponentView | ComponentViewLayout<TPublicLayout>>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new CompositeComponentView(
            "li", layout, toPublicLayout
        ).asLayout();
    }

}

export class CompositeComponentBuilder<TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>> {
    constructor(private readonly viewModel: ComponentViewModel & TViewModelLayout) {
    }

    view<TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }>(view: ComponentView & IStyleableComponentView & IPublicLayoutView<TViewPublicLayout>) {
        return new CompositeComponentBuilderWithView(this.viewModel, view);
    }
}

class CompositeComponentBuilderWithView<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends {
        [K in keyof TViewLayout]: ComponentView
    },
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }
> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout,
        private readonly view: ComponentView & IStyleableComponentView & IPublicLayoutView<TViewPublicLayout>
    ) {

    }

    factory<TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }>(factory: TFactory) {
        return new CompositeComponentBuilderWithComponentFactory<TViewModelLayout, TViewLayout, TViewPublicLayout, TFactory>(this.viewModel, this.view, factory);
    }
}

class CompositeComponentBuilderWithComponentFactory<
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
        private readonly viewModel: ComponentViewModel & TViewModelLayout,
        private readonly view: ComponentView & IStyleableComponentView & IPublicLayoutView<TViewPublicLayout>,
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
        return new CompositeComponent(
            this.viewModel,
            this.view,
            layout as { [K in keyof TFactory]: ReturnType<TFactory[K]> }
        ).asLayout();
    }
}

type CompositeComponentLayoutProperties<T> = {
    [Key in keyof T]: T[Key] extends ComponentView ? Key : never;
}[keyof T];

export type CompositeComponentLayout<T> = {
    [Key in CompositeComponentLayoutProperties<T>]: T[Key];
}

class CompositeComponent<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewPublicLayout extends ComponentViewLayout<TViewPublicLayout>,
    TComponentLayout extends CompositeComponentLayout<TComponentLayout>
    > extends Component {
    constructor(viewModel: ComponentViewModel & TViewModelLayout, view: ComponentView & IPublicLayoutView<TViewPublicLayout>, layout: TComponentLayout) {
        super(viewModel, view);
        for (const key in layout) {
            const childComponent = Reflect.get(layout, key);
            this.addComponent(childComponent);
            Reflect.set(this, key, childComponent);
        }
    }

    asLayout() {
        return this as any as Component & TComponentLayout;
    }
}
