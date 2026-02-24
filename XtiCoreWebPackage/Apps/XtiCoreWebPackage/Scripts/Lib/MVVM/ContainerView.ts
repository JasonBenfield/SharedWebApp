import { ChildViewManager } from "./ChildViewManager";
import { ComponentView, IComponentView } from "./ComponentView";
import { StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor } from "./Types";

export interface IContainerComponentView extends IComponentView {
    addChildView<T extends IComponentView>(view: T): void;
    removeAllChildViews(): void;
    removeChildView(view: IComponentView): void;
}

export function ContainerComponentViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements IContainerComponentView {
        private readonly _childViewManager = new ChildViewManager();

        addToDom(parent: HTMLElement) {
            super.addToDom(parent);
            this._childViewManager.addChildViewsToDom(this.element);
        }

        removeFromDom() {
            this._childViewManager.removeChildViewsFromDom();
            super.removeFromDom();
        }

        addChildView<T extends IComponentView>(view: T) {
            view = this._childViewManager.addChildView(view);
            const element = this.element;
            if (element) {
                view.addToDom(element);
            }
            return view;
        }

        removeAllChildViews() {
            this._childViewManager.removeAllChildViews();
        }

        removeChildView(view: IComponentView) {
            this._childViewManager.removeChildView(view);
        }

        dispose() {
            this._childViewManager.dispose();
            super.dispose();
        }
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