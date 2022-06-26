import { ContextualClass } from "../ContextualClass";
import { CssClass } from "../CssClass";
import { EnumerableArray, FilteredArray, MappedArray } from "../Enumerable";
import { CssLengthUnit } from "../Html/CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { HtmlElementView } from "./HtmlElementView";
import { IHtmlAttributes, IHtmlElementView, IHtmlStyle, ViewConstructor } from './Types';
import { ViewEventBuilder } from "./ViewEventBuilder";

interface ICssBuilders {
    [name: string]: ICssBuilder | string;
}

export class BasicComponentView {
    private attr: IHtmlAttributes = {
        style: {}
    };
    private readonly cssClass = new CssClass();
    private readonly css: ICssBuilders = {};
    private readonly views: BasicComponentView[] = [];
    private isVisible = true;
    protected readonly elementView: HtmlElementView;
    private text: string;

    constructor(private readonly container: BasicComponentView, createElement: IHtmlElementView) {
        if (typeof createElement === 'string') {
            this.elementView = HtmlElementView.fromTag(createElement);
        }
        else if (createElement instanceof HTMLElement) {
            this.elementView = HtmlElementView.fromElement(createElement);
        }
        else {
            this.elementView = createElement();
        }
    }

    getViewByElement(element: HTMLElement) {
        for (const view of this.views) {
            if (view.hasElement(element)) {
                return view;
            }
        }
        if (this.hasElement(element)) {
            return this;
        }
        return null;
    }

    private hasElement(element: HTMLElement) {
        return this.elementView.hasElement(element);
    }

    isOrContainsView(view: BasicComponentView) {
        if (view === this) {
            return true;
        }
        for (const childView of this.views) {
            if (childView.isOrContainsView(view)) {
                return true;
            }
        }
        return false;
    }

    protected setAttr(config: (attr: IHtmlAttributes) => void) {
        config(this.attr);
        this.elementView.setAttributes(this.attr);
    }

    protected setStyle(config: (style: IHtmlStyle) => void) {
        config(this.attr.style);
        this.elementView.setAttribute(this.attr, 'style');
    }

    configure(action: (c: this) => void) {
        action(this);
        return this;
    }

    setViewID(id: string) {
        this.setAttr(attr => attr.id = id);
    }

    setViewName(name: string) {
        this.setAttr(attr => attr.name = name);
    }

    setZIndex(zIndex: number) {
        this.setStyle(style => style["z-index"] = zIndex.toString());
    }

    setHeight(height: CssLengthUnit) {
        this.setStyle(style => style.height = height.value());
    }

    setWidth(width: CssLengthUnit) {
        this.setStyle(style => style.width = width.value());
    }

    setMinHeight(minHeight: CssLengthUnit) {
        this.setStyle(style => style["min-height"] = minHeight.value());
    }

    setMinWidth(minWidth: CssLengthUnit) {
        this.setStyle(style => style["min-width"] = minWidth.value());
    }

    setMaxHeight(maxHeight: CssLengthUnit) {
        this.setStyle(style => style["max-height"] = maxHeight.value());
    }

    setMaxWidth(maxWidth: CssLengthUnit) {
        this.setStyle(style => style["max-width"] = maxWidth.value());
    }

    setBackgroundContext(contextClass: ContextualClass) {
        this.setCss('bg-context', contextClass.append('bg'));
    }

    setTextCss(textCss: TextCss) {
        this.setCss('text', textCss);
    }

    setMargin(margin: MarginCss) {
        this.setCss('margin', margin);
    }

    setPadding(padding: PaddingCss) {
        this.setCss('padding', padding);
    }

    setTitle(title: string) {
        this.setAttr(attr => attr.title = title);
    }

    protected setCss(name: string, value: ICssBuilder | string) {
        const previousValue = this.buildCss(this.css[name]);
        const updatedValued = this.buildCss(value);
        this.replaceCssName(previousValue, updatedValued);
        this.css[name] = value;
    }

    private buildCss(value: ICssBuilder | string) {
        if (value) {
            if (typeof value === 'string') {
                return value;
            }
            return value.cssClass().toString();
        }
        return '';
    }

    replaceCss(css: CssClass) {
        this.clearCss();
        return this.addCssFrom(css);
    }

    clearCss() {
        this.cssClass.clear();
        this.setCssClass();
    }

    addCssFrom(css: CssClass | ICssBuilder) {
        this.cssClass.addFrom(css);
        this.setCssClass();
    }

    private replaceCssName(nameToRemove: string, nameToAdd: string) {
        this.cssClass.removeName(nameToRemove);
        this.cssClass.addName(nameToAdd);
        this.setCssClass();
    }

    addCssName(name: string) {
        this.cssClass.addName(name);
        this.setCssClass();
    }

    removeCssName(name: string) {
        this.cssClass.removeName(name);
        this.setCssClass();
    }

    private setCssClass() {
        this.setAttr(attr => attr.class = this.cssClass.toString());
    }

    show() {
        this.isVisible = true;
        if (this.container) {
            this.container.replaceElements();
        }
    }

    hide() {
        this.isVisible = false;
        if (this.container) {
            this.container.removeView(this);
        }
    }

    on(eventName: string) {
        return new ViewEventBuilder(this, this.elementView, eventName);
    }

    get viewCount() { return this.views.length; }

    protected getViews() { return new EnumerableArray(this.views).value(); }

    protected disposeAllViews() {
        for (const view of this.views) {
            view.dispose();
        }
        this.views.splice(0, this.views.length);
        this.elementView.replaceElements([]);
    }

    protected disposeView(view: BasicComponentView) {
        this.removeView(view);
        view.dispose();
    }

    dispose() {
        this.disposeAllViews();
        this.container.removeView(this);
    }

    protected removeView(view: BasicComponentView) {
        const index = this.views.indexOf(view);
        if (index > -1) {
            this.views.splice(index, 1);
        }
        this.elementView.removeElement(view.elementView.element);
    }

    protected addView<T extends BasicComponentView>(ctor: ViewConstructor<T>) {
        return this.addViews(1, ctor)[0];
    }

    protected addViews<T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>) {
        const views: T[] = [];
        for (let i = 0; i < howMany; i++) {
            const view = new ctor(this);
            this.views.push(view);
            views.push(view);
        }
        this.replaceElements();
        return views;
    }

    protected insertView<T extends BasicComponentView>(index: number, ctor: ViewConstructor<T>) {
        const view = new ctor(this);
        this.views.splice(index, 0, view);
        this.replaceElements();
        return view;
    }

    private replaceElements() {
        const viewElements = new MappedArray(
            new FilteredArray(
                this.views,
                v => v.isVisible
            ),
            v => v.elementView.element
        ).value();
        this.elementView.replaceElements(viewElements);
    }
}