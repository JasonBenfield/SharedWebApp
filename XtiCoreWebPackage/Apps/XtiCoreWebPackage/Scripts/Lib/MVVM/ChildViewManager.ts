import { ComponentView, ComponentViewEventArgs } from "./ComponentView";
import { IComponentView } from "./Types";

export class ChildViewManager {
    private readonly _views: IComponentView[] = [];

    constructor(private readonly _view: ComponentView) {
        _view.when.postAddElement.then(this.onElementAdded.bind(this));
        _view.when.preRemoveElement.then(this.onElementRemoved.bind(this));
    }

    private onElementAdded(evt: CustomEvent<ComponentViewEventArgs>) {
        for (const view of this._views) {
            view.addToParent(evt.detail.element);
        }
    }

    private onElementRemoved() {
        for (const view of this._views) {
            view.removeFromParent();
        }
    }

    addChildView<T extends IComponentView>(view: T) {
        this._views.push(view);
        const element = this._view.element;
        if (element) {
            for (const view of this._views) {
                view.addToParent(element);
            }
        }
        return view;
    }

    removeAllChildViews() {
        for (const view of this._views) {
            view.dispose();
        }
        this._views.splice(0, this._views.length);
    }

    removeChildView(view: IComponentView) {
        const views = this._views;
        if (views) {
            const index = this._views.indexOf(view);
            if (index > -1) {
                this._views.splice(index, 1);
            }
        }
        view.dispose();
    }

    dispose() {
        for (const view of this._views) {
            view.dispose();
        }
        this._views.splice(0, this._views.length);
    }
}