import { ComponentView, IComponentViewLayout } from "./ComponentView";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor } from "./Types";

export interface IContainerComponentView {
    addLayout<T extends IComponentViewLayout>(layout: T): T;
    addChildView<T extends ComponentView>(view: T): T;
    removeAllChildViews(): void;
    removeChildView(view: ComponentView): void;
}

export function ContainerComponentViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IContainerComponentView {
        declare public addLayout: <T extends IComponentViewLayout>(layout: T) => this & T;
        declare public addChildView: <T extends ComponentView>(view: T) => T;
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

    static label() {
        return new ContainerComponentView(() => document.createElement("label"));
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new ContainerComponentView(() => document.createElement(`h${size}`));
    }
}