import { BasicComponentView } from "./BasicComponentView";
import { IContainerView, IHtmlElementView, ViewConstructor } from "./Types";

export class BasicContainerView extends BasicComponentView implements IContainerView {
    constructor(container: BasicComponentView | null, createElementView: IHtmlElementView) {
        super(container, createElementView);
    }

    makeDraggable() {
        this.setAttr(attr => attr.draggable = "true");
    }

    declare getViews: () => BasicComponentView[];

    declare disposeAllViews: () => void;

    declare addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;

    declare addViews: <T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>) => T[];

    declare insertView: <T extends BasicComponentView>(index: number, ctor: ViewConstructor<T>) => T;
}