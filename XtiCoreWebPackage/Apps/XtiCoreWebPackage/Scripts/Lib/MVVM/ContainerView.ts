import { ChildViewManager } from "./ChildViewManager";
import { IComponentView } from "./ComponentView";
import { StyleableComponentView } from "./StyleableComponentView";

export interface IContainerView extends IComponentView {
    addChildView<T extends IComponentView>(view: T): void;
    removeAllChildViews(): void;
    removeChildView(view: IComponentView): void;
}

export class ContainerView extends StyleableComponentView implements IContainerView {
    static block() {
        return new ContainerView(() => document.createElement("div"));
    }

    static span() {
        return new ContainerView(() => document.createElement("span"));
    }

    static label() {
        return new ContainerView(() => document.createElement("label"));
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new ContainerView(() => document.createElement(`h${size}`));
    }

    private readonly _childViewManager: ChildViewManager;

    constructor(createElement: () => HTMLElement) {
        super(createElement);
        this._childViewManager = new ChildViewManager(this);
    }

    addChildView<T extends IComponentView>(view: T) {
        return this._childViewManager.addChildView(view);
    }

    removeAllChildViews() {
        this._childViewManager.removeAllChildViews();
    }

    removeChildView(view: IComponentView) {
        this._childViewManager.removeChildView(view);
    }

    dispose() {
        super.dispose();
        this._childViewManager.dispose();
    }
}