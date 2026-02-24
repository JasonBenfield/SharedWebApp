import { ChildViewManager } from "./ChildViewManager";
import { Component } from "./Component";
import { ComponentView, IComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor } from "./Types";

export type CompositeViewModelProperties<T> = {
    [Key in keyof T]: T[Key] extends ComponentViewModel ? Key : never;
}[keyof T];

export type CompositeViewModelTemplate<T> = {
    [Key in CompositeViewModelProperties<T>]: T[Key];
}

export class CompositeComponentViewModel<T extends CompositeViewModelTemplate<T>> extends ComponentViewModel {
    static create<T extends CompositeViewModelTemplate<T>>(layout: T) {
        const vm: any = new CompositeComponentViewModel(layout);
        return vm as CompositeComponentViewModel<T> & CompositeViewModelTemplate<T>;
    }

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

    createComponent(view: IComponentView) {
        return new CompositeComponent(this, view);
    }
}

export type CompositeComponentLayout<TViewModel extends ComponentViewModel> = {
    [K in keyof TViewModel]: TViewModel[K] extends ComponentViewModel ? ReturnType<TViewModel[K]["createComponent"]> : Component
}

export class CompositeComponent<TViewModel extends ComponentViewModel & CompositeViewModelTemplate<TViewModel>> extends Component {
    //static create(viewModel: TViewModel, view: IComponentView) {
    //    return new CompositeComponent(viewModel, view) as (CompositeComponent & CompositeComponentLayout<TViewModel>);
    //}

    private readonly _components: Component[] = [];
    protected readonly composite: CompositeComponentLayout<TViewModel>;

    constructor(viewModel: TViewModel, view: IComponentView) {
        super(viewModel, view);
        const component: any = this;
        for (const key in this.viewModel) {
            const childView = Reflect.get(this.view, key);
            if (childView && childView instanceof ComponentView) {
                const childViewModel = Reflect.get(this.viewModel, key);
                if (childViewModel && childViewModel instanceof ComponentViewModel) {
                    const childComponent = childViewModel.createComponent(childView);
                    this.addComponent(childComponent);
                    component[key] = childComponent;
                }
            }
        }
        this.composite = this as CompositeComponentLayout<TViewModel>;
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

export interface ICompositeComponentView {
    compose<TLayout, TPublicLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout): this & TPublicLayout;
}

export function CompositeComponentViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements ICompositeComponentView {
        private readonly _childViewManager = new ChildViewManager();

        compose<TLayout>(layout: TLayout): this & TLayout;
        compose<TLayout, TPublicLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout): this & TPublicLayout;
        compose<TLayout, TPublicLayout>(layout: TLayout, toPublicLayout?: (l: TLayout) => TPublicLayout) {
            for (const key in layout) {
                const childView = layout[key];
                if (childView && childView instanceof ComponentView) {
                    this._childViewManager.addChildView(childView);
                }
            }
            const view: any = this;
            const publicLayout: any = toPublicLayout ? toPublicLayout(layout) : layout;
            for (const key in publicLayout) {
                const childView = publicLayout[key];
                view[key] = childView;
            }
            return this;
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
    };
}

export class CompositeComponentView extends CompositeComponentViewMixin(StyleableComponentViewMixin(ComponentView)) {
    static block() {
        return new CompositeComponentView("div");
    }

    static span() {
        return new CompositeComponentView("span");
    }

    static label() {
        return new CompositeComponentView("label");
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new CompositeComponentView(`h${size}`);
    }
}
