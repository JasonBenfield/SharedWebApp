import { Component } from "./Component";
import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { StyleableComponentViewMixin } from "./StyleableComponentView";

export type CompositeComponentViewModelProperties<TViewModel> = {
    [K in keyof TViewModel]: TViewModel[K] extends ComponentViewModel ? K : never;
}[keyof TViewModel];

export type CompositeComponentViewModelLayout<T> = {
    [Key in CompositeComponentViewModelProperties<T>]: T[Key];
}

export class CompositeComponentViewModel<T extends CompositeComponentViewModelLayout<T>> extends ComponentViewModel {
    constructor(layout: T) {
        super();
        const vm: any = this;
        for (const key in layout) {
            const childVM: any = layout[key];
            if (childVM && childVM instanceof ComponentViewModel) {
                vm[key] = childVM;
            }
        }
        return (<any>this) as (CompositeComponentViewModel<T> & T);
    }

    asLayout() { return this as this & T; }
}

export type CompositeComponentLayoutProperties<T> = {
    [Key in keyof T]: T[Key] extends ComponentView ? Key : never;
}[keyof T];

export type CompositeComponentLayout<T> = {
    [Key in CompositeComponentLayoutProperties<T>]: T[Key];
}

class CompositeComponent<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends IComponentViewLayout,
    TViewPublicLayout extends IComponentViewLayout,
    TComponentLayout extends CompositeComponentLayout<TComponentLayout>
> extends Component {
    constructor(viewModel: ComponentViewModel & TViewModelLayout, view: CompositeComponentView<TViewLayout, TViewPublicLayout>, layout: TComponentLayout) {
        super(viewModel, view);
        for (const key in layout) {
            const childComponent = Reflect.get(layout, key);
            this.addComponent(childComponent);
            Reflect.set(this, key, childComponent);
        }
    }

    asLayout() { return this as this & TComponentLayout; }
}

export class CompositeComponentViewBuilder {
    static block() {
        return new CompositeComponentViewBuilder("div");
    }

    static span() {
        return new CompositeComponentViewBuilder("span");
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new CompositeComponentViewBuilder(`h${size}`);
    }

    constructor();
    constructor(createElement: () => HTMLElement);
    constructor(tagName: string);
    constructor(tagNameOrCreateElement?: string | (() => HTMLElement)) {
        this.tagNameOrCreateElement = tagNameOrCreateElement || "div";
    }

    private readonly tagNameOrCreateElement: string | (() => HTMLElement);

    layout<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new CompositeComponentViewWithPublicLayoutBuilder(this.tagNameOrCreateElement, layout);
    }

    build<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new CompositeComponentViewWithPublicLayoutBuilder(this.tagNameOrCreateElement, layout)
            .build(l => Object.assign({}, l));
    }
}

class CompositeComponentViewWithPublicLayoutBuilder<TLayout extends IComponentViewLayout> {
    constructor(
        private readonly tagNameOrCreateElement: string | (() => HTMLElement),
        private readonly layout: TLayout
    ) {
    }

    build<TPublicLayout extends IComponentViewLayout>(toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new CompositeComponentView(
            this.tagNameOrCreateElement,
            this.layout,
            toPublicLayout
        ).asLayout();
    }
}

export class CompositeComponentView<TLayout extends IComponentViewLayout, TPublicLayout extends IComponentViewLayout> extends StyleableComponentViewMixin(ComponentView) {
    static block<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new CompositeComponentViewBuilder("div").build(layout);
    }

    static span<TLayout extends IComponentViewLayout>(layout: TLayout) {
        return new CompositeComponentViewBuilder("span").build(layout);
    }

    static heading<TLayout extends IComponentViewLayout>(size: 1 | 2 | 3 | 4 | 5 | 6, layout: TLayout) {
        return new CompositeComponentViewBuilder(`h${size}`).build(layout);
    }

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
        return this as this & TLayout;
    }
}

export type CompositeComponentViewLayoutProperties<TView> = {
    [Key in (keyof TView)]: TView[Key] extends ComponentView ? Key : never;
}[keyof TView];

export class CompositeComponentBuilder<TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>> {
    constructor(private readonly viewModel: ComponentViewModel & TViewModelLayout) {
    }

    view<
        TViewLayout extends IComponentViewLayout,
        TViewPublicLayout extends {
            [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
        }
    >(view: CompositeComponentView<TViewLayout, TViewPublicLayout>) {
        return new CompositeComponentBuilderWithView(this.viewModel, view);
    }
}

class CompositeComponentBuilderWithView<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends IComponentViewLayout,
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }
> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout>
    ) {

    }

    factory<TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }>(factory: TFactory) {
        return new CompositeComponentBuilderWithComponentFactory(this.viewModel, this.view, factory);
    }
}

class CompositeComponentBuilderWithComponentFactory<
    TViewModelLayout extends CompositeComponentViewModelLayout<TViewModelLayout>,
    TViewLayout extends IComponentViewLayout,
    TViewPublicLayout extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: ComponentView
    }, TFactory extends {
        [K in CompositeComponentViewModelProperties<TViewModelLayout>]: (vm: TViewModelLayout[K], view: TViewPublicLayout[K]) => Component
    }> {
    constructor(
        private readonly viewModel: ComponentViewModel & TViewModelLayout,
        private readonly view: CompositeComponentView<TViewLayout, TViewPublicLayout>,
        private readonly compositeFactory: TFactory
    ) {
    }

    build() {
        const layout = {};
        for (const key in this.viewModel) {
            const childVM = Reflect.get(this.viewModel, key);
            const childView = Reflect.get(this.view.publicLayout, key);
            const createComponent = Reflect.get(this.compositeFactory, key);
            Reflect.set(layout, key, createComponent(childVM, childView));
        }
        return new CompositeComponent(
            this.viewModel,
            this.view,
            layout as { [K in keyof TFactory]: ReturnType<TFactory[K]> }
        ).asLayout();
    }
}