import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IHtmlAttributes, IHtmlStyle, ViewConstructor } from "./Types";

export class BasicComponentWrapper extends BasicComponentView {
    constructor(container: BasicComponentView, elementView: HtmlElementView) {
        super(container, () => elementView);
    }

    setAttr: (config: (attr: IHtmlAttributes) => void) => void;

    setStyle: (config: (style: IHtmlStyle) => void) => void;

    setCss: (name: string, value: ICssBuilder | string) => void;

    getViews: () => BasicComponentView[];

    disposeAllViews: () => void;

    addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;

    addViews: <T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>) => T[];

    insertView: <T extends BasicComponentView>(index: number, ctor: ViewConstructor<T>) => T;
}