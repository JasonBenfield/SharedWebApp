import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IContainerView, ViewConstructor } from "./Types";

export class BasicContainerView extends BasicComponentView implements IContainerView {
    constructor(elementView: HtmlElementView) {
        super(elementView);
    }

    getViews: () => BasicComponentView[];

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;

    addViews: <T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>) => T[];

    addElement(el: HTMLElement) {
        this.elementView.addElement(el);
    }

    removeElement(el: HTMLElement) {
        this.elementView.removeElement(el);
    }
}