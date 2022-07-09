﻿import { BasicComponentView } from "./BasicComponentView";
import { IHtmlElementView, ViewConstructor } from "./Types";

export class BasicContainerView extends BasicComponentView {
    constructor(container: BasicComponentView, createElementView: IHtmlElementView) {
        super(container, createElementView);
    }

    getViews: () => BasicComponentView[];

    disposeAllViews: () => void;

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;

    addViews: <T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>) => T[];

    insertView: <T extends BasicComponentView>(index: number, ctor: ViewConstructor<T>) => T;
}