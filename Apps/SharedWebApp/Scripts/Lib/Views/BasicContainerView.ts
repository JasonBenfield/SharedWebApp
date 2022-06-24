import { EnumerableArray } from "../Enumerable";
import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView, ViewConstructor } from "./Types";

export class BasicContainerView extends BasicComponentView implements IContainerView {
    private readonly views: BasicComponentView[] = [];

    constructor(elementView: HtmlElementView) {
        super(elementView);
    }

    getViews() { return new EnumerableArray(this.views).value(); }

    addView<T extends BasicComponentView>(ctor: ViewConstructor<T>) {
        const view = new ctor(this);
        this.views.push(view);
        return view;
    }

    addElement(el: HTMLElement) {
        this.elementView.addElement(el);
    }

    removeElement(el: HTMLElement) {
        this.elementView.removeElement(el);
    }
}