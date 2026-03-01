import { Component } from "./Component";
import { IComponentFactory } from "./ComponentFactory";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { BaseLinkComponentView, LinkComponent, LinkComponentViewModel } from "./LinkComponent";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { BaseTextComponentView, TextComponent, TextComponentViewModel } from "./TextComponent";
import { BaseTextLinkComponentView, TextLinkComponent, TextLinkComponentViewModel } from "./TextLinkComponent";
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

    protected constructor(layout: T) {
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
}

export type CompositeComponentLayout<TViewModel extends ComponentViewModel> = {
    [K in keyof TViewModel]: TViewModel[K] extends TextLinkComponentViewModel ? TextLinkComponent :
    TViewModel[K] extends TextComponentViewModel ? TextComponent :
    TViewModel[K] extends CompositeComponentViewModel<TViewModel[K]> ? CompositeComponent<TViewModel[K]> & CompositeComponentLayout<TViewModel[K]> :
    Component;
}

export class CompositeComponentFactory implements IComponentFactory {
    create<TViewModel extends ComponentViewModel>(viewModel: TViewModel, view: ComponentView): Component {
        return viewModel instanceof TextLinkComponentViewModel ? new TextLinkComponent(viewModel, view as BaseTextLinkComponentView) :
            viewModel instanceof TextComponentViewModel ? new TextComponent(viewModel, view as BaseTextComponentView) :
                viewModel instanceof LinkComponentViewModel ? new LinkComponent(viewModel, view as BaseLinkComponentView) :
                    viewModel instanceof CompositeComponentViewModel ? CompositeComponent.createComposite(viewModel, view, this) :
                        new Component(viewModel, view);
    }

}
export class CompositeComponent<TViewModel extends ComponentViewModel & CompositeViewModelTemplate<TViewModel>> extends Component {
    static createComposite<TViewModel extends ComponentViewModel & CompositeViewModelTemplate<TViewModel>>(viewModel: TViewModel, view: ComponentView, componentFactory: IComponentFactory = new CompositeComponentFactory()) {
        return new CompositeComponent(viewModel, view, componentFactory) as CompositeComponent<TViewModel> & CompositeComponentLayout<TViewModel>;
    }

    protected constructor(viewModel: TViewModel, view: ComponentView, componentFactory: IComponentFactory = new CompositeComponentFactory()) {
        super(viewModel, view);
        const component: any = this;
        const factory = componentFactory;
        for (const key in this.viewModel) {
            const childView: any = Reflect.get(this.view, key);
            if (childView && childView instanceof ComponentView) {
                const childViewModel: any = Reflect.get(this.viewModel, key);
                if (childViewModel && childViewModel instanceof ComponentViewModel) {
                    const childComponent = factory.create(childViewModel, childView);
                    this.addComponent(childComponent);
                    component[key] = childComponent;
                }
            }
        }
    }

}

export interface ICompositeComponentView {
    compose<TLayout, TPublicLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout): this & TPublicLayout;
}

export function CompositeComponentViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements ICompositeComponentView {
        compose<TLayout>(layout: TLayout): this & TLayout;
        compose<TLayout, TPublicLayout>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout): this & TPublicLayout;
        compose<TLayout, TPublicLayout>(layout: TLayout, toPublicLayout?: (l: TLayout) => TPublicLayout) {
            for (const key in layout) {
                const childView = layout[key];
                if (childView && childView instanceof ComponentView) {
                    this.addChildView(childView);
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
