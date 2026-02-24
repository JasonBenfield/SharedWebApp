import { ChildViewManager } from "./ChildViewManager";
import { IComponentView } from "./ComponentView";
import { StyleableComponentView } from "./StyleableComponentView";

export interface IContainerComponentView extends IComponentView {
    addChildView<T extends IComponentView>(view: T): void;
    removeAllChildViews(): void;
    removeChildView(view: IComponentView): void;
}

export class ContainerComponentView extends StyleableComponentView implements IContainerComponentView {
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

    private readonly _childViewManager: ChildViewManager;

    constructor(createElement: () => HTMLElement) {
        super(createElement);
        this._childViewManager = new ChildViewManager();
    }

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
}