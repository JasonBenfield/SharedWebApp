import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { IHtmlAttributes, IHtmlStyle, ViewConstructor } from "./Types";

export class BasicComponentWrapper extends BasicComponentView {
    constructor(container: BasicComponentView, elementView: HtmlElementView) {
        super(container, () => elementView);
    }

    declare setAttr: (config: (attr: IHtmlAttributes) => void) => void;

    declare setStyle: (config: (style: IHtmlStyle) => void) => void;

    declare setCss: (name: string, value: ICssBuilder | string) => void;

    declare getViews: () => BasicComponentView[];

    declare disposeAllViews: () => void;

    declare addView: <T extends BasicComponentView>(ctor: ViewConstructor<T>) => T;

    declare addViews: <T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>) => T[];

    declare insertView: <T extends BasicComponentView>(index: number, ctor: ViewConstructor<T>) => T;
}