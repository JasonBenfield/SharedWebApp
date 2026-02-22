import { IComponentView } from "./ComponentView";

export class ChildViewManager {
    private readonly _views: IComponentView[] = [];

    addChildViewsToDom(element: HTMLElement | null) {
        if (element) {
            for (const view of this._views) {
                view.addToDom(element);
            }
        }
    }

    removeChildViewsFromDom() {
        for (const view of this._views) {
            view.removeFromDom();
        }
    }

    addChildView<T extends IComponentView>(view: T) {
        this._views.push(view);
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