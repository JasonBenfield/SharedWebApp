import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor } from "./Types";

export class ContainerComponent extends Component {
    constructor(viewModel: ComponentViewModel, view: ComponentView, ...changeHandlers: ComponentChangeHandler<typeof viewModel, typeof view>[]) {
        super(viewModel, view, ...changeHandlers);
    }

    declare public addComponent: <TComponent extends Component>(c: TComponent) => TComponent;

    addComponents(...components: Component[]) {
        for (const component of components) {
            this.addComponent(component);
        }
    }
}

export interface IContainerComponentView {
    addLayout<TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout): TLayout;
    addChildView<T extends ComponentView>(view: T): T;
    insertChildView<T extends ComponentView>(view: T, index: number): T;
    removeAllChildViews(): void;
    removeChildView(view: ComponentView): void;
}

export function ContainerComponentViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IContainerComponentView {
        declare public addLayout: <TLayout extends ComponentViewLayout<TLayout>>(layout: TLayout) => this & TLayout;
        declare public addChildView: <T extends ComponentView>(view: T) => T;
        declare public insertChildView: <T extends ComponentView>(view: T, index: number) => T;
        declare public removeAllChildViews: () => void;
        declare public removeChildView: (view: ComponentView) => void;
    };
}

export class ContainerComponentView extends ContainerComponentViewMixin(StyleableComponentViewMixin(ComponentView)) implements IContainerComponentView {
    static block() {
        return new ContainerComponentView(() => document.createElement("div"));
    }

    static span() {
        return new ContainerComponentView(() => document.createElement("span"));
    }

    static listItem() {
        return new ContainerComponentView(() => document.createElement("li"));
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new ContainerComponentView(() => document.createElement(`h${size}`));
    }
}