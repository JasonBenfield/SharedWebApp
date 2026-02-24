import { ChildViewManager } from "./ChildViewManager";
import { Component } from "./Component";
import { ComponentView, IComponentView } from "./ComponentView";
import { ComponentViewModel, IComponentFactory } from "./ComponentViewModel";
import { StyleableComponentView } from "./StyleableComponentView";

export type CompositeViewModelProperties<T> = {
    [Key in keyof T]: T[Key] extends ComponentViewModel ? Key : never;
}[keyof T];

export type CompositeViewModelTemplate<T> = {
    [Key in CompositeViewModelProperties<T>]: T[Key];
}

export class CompositeComponentFactory implements IComponentFactory {
    create(viewModel: ComponentViewModel, view: IComponentView) {
        return new CompositeComponent(viewModel, view);
    }
}

export class CompositeComponentViewModel<T extends CompositeViewModelTemplate<T>> extends ComponentViewModel {
    static create<T extends CompositeViewModelTemplate<T>>(layout: T) {
        const vm: any = new CompositeComponentViewModel(layout);
        return vm as ComponentViewModel & CompositeViewModelTemplate<T>;
    }

    private constructor(layout: T) {
        super();
        this.setComponentFactory(new CompositeComponentFactory());
        const vm: any = this;
        for (const key in layout) {
            const childVM: any = layout[key];
            if (childVM && childVM instanceof ComponentViewModel) {
                vm[key] = childVM;
            }
        }
    }
}

export class CompositeComponent extends Component {
    private readonly _components: Component[] = [];

    constructor(viewModel: ComponentViewModel, view: IComponentView) {
        super(viewModel, view);
        for (const key in viewModel) {
            const childView = Reflect.get(view, key);
            if (childView && childView instanceof ComponentView) {
                const childViewModel = Reflect.get(viewModel, key);
                if (childViewModel && childViewModel instanceof ComponentViewModel) {
                    const component = childViewModel.createComponent(childView);
                    this.addComponent(component);
                }
            }
        }
    }

    protected addComponent<TComponentController extends Component>(c: TComponentController) {
        this._components.push(c);
        return c;
    }

    dispose() {
        for (const component of this._components) {
            component.dispose();
        }
        this._components.splice(0, this._components.length);
        super.dispose();
    }
}

export type ViewLayout<T> = {
    [Key in keyof T]: T[Key] extends IComponentView ? T[Key] : never;
}

export interface ICompositeComponentViewLayout<TLayout extends ViewLayout<TLayout>> {
    layout: TLayout;
};

export type ICompositeComponentView<TLayout extends ViewLayout<TLayout>, TPublicLayout> =
    StyleableComponentView &
    ICompositeComponentViewLayout<TLayout> & {
        [K in keyof TPublicLayout]: TPublicLayout[K];
    };

export class CompositeComponentView<TLayout, TPublicLayout> extends StyleableComponentView {
    static block<TLayout extends CompositeViewModelTemplate<TLayout>>(
        layout: ViewLayout<TLayout>
    ): ICompositeComponentView<TLayout, TLayout>;
    static block<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout: (layout: TLayout) => TPublicLayout
    ): ICompositeComponentView<TLayout, TPublicLayout>;
    static block<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout?: (layout: TLayout) => TPublicLayout
    ) {
        const view: any = new CompositeComponentView(
            () => document.createElement("div"),
            layout,
            toPublicLayout || ((l) => l as TPublicLayout)
        );
        return view as ICompositeComponentView<TLayout, TPublicLayout>;
    }

    static span<TLayout extends CompositeViewModelTemplate<TLayout>>(
        layout: ViewLayout<TLayout>
    ): ICompositeComponentView<TLayout, TLayout>;
    static span<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout: (layout: TLayout) => TPublicLayout
    ): ICompositeComponentView<TLayout, TPublicLayout>;
    static span<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout?: (layout: TLayout) => TPublicLayout
    ) {
        const view: any = new CompositeComponentView(
            () => document.createElement("span"),
            layout,
            toPublicLayout || ((l) => l as TPublicLayout)
        );
        return view as ICompositeComponentView<TLayout, TPublicLayout>;
    }

    static label<TLayout extends CompositeViewModelTemplate<TLayout>>(
        layout: ViewLayout<TLayout>
    ): ICompositeComponentView<TLayout, TLayout>;
    static label<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout: (layout: TLayout) => TPublicLayout
    ): ICompositeComponentView<TLayout, TPublicLayout>;
    static label<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        layout: ViewLayout<TLayout>,
        toPublicLayout?: (layout: TLayout) => TPublicLayout
    ) {
        const view: any = new CompositeComponentView(
            () => document.createElement("label"),
            layout,
            toPublicLayout || ((l) => l as TPublicLayout)
        );
        return view as ICompositeComponentView<TLayout, TPublicLayout>;
    }

    static heading<TLayout extends CompositeViewModelTemplate<TLayout>>(
        size: 1 | 2 | 3 | 4 | 5 | 6,
        layout: ViewLayout<TLayout>
    ): ICompositeComponentView<TLayout, TLayout>;
    static heading<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        size: 1 | 2 | 3 | 4 | 5 | 6,
        layout: ViewLayout<TLayout>,
        toPublicLayout: (layout: TLayout) => TPublicLayout
    ): ICompositeComponentView<TLayout, TPublicLayout>;
    static heading<TLayout extends CompositeViewModelTemplate<TLayout>, TPublicLayout>(
        size: 1 | 2 | 3 | 4 | 5 | 6,
        layout: ViewLayout<TLayout>,
        toPublicLayout?: (layout: TLayout) => TPublicLayout
    ) {
        const view: any = new CompositeComponentView(
            () => document.createElement(`h${size}`),
            layout,
            toPublicLayout || ((l) => l as TPublicLayout)
        );
        return view as ICompositeComponentView<TLayout, TPublicLayout>;
    }

    private readonly _childViewManager: ChildViewManager;

    constructor(
        createElement: () => HTMLElement,
        readonly layout: TLayout,
        toPublicLayout: (layout: TLayout) => TPublicLayout = ((l: TLayout) => (<any>l) as TPublicLayout)
    ) {
        super(createElement);
        this._childViewManager = new ChildViewManager();
        const view: any = this;
        for (const key in layout) {
            const childView = layout[key];
            if (childView && childView instanceof ComponentView) {
                this._childViewManager.addChildView(childView);
            }
        }
        const publicLayout = toPublicLayout(layout);
        for (const key in publicLayout) {
            const childView = publicLayout[key];
            view[key] = childView;
        }
    }

    addToDom(parent: HTMLElement) {
        super.addToDom(parent);
        this._childViewManager.addChildViewsToDom(this.element);
    }

    removeFromDom() {
        this._childViewManager.removeChildViewsFromDom();
        super.removeFromDom();
    }

    removeAllChildViews() {
        this._childViewManager.removeAllChildViews();
    }

    dispose() {
        this._childViewManager.dispose();
        super.dispose();
    }
}