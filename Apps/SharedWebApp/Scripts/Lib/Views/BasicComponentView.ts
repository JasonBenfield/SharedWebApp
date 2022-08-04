import { ContextualClass } from "../ContextualClass";
import { CssClass } from "../CssClass";
import { EnumerableArray, FilteredArray, MappedArray } from "../Enumerable";
import { CssLengthUnit } from "../CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { HtmlElementView } from "./HtmlElementView";
import { IHtmlAttributes, IHtmlElementView, IHtmlStyle, ViewConstructor } from './Types';
import { ViewEventBuilder } from "./ViewEventBuilder";

interface ICssBuilders {
    [name: string]: ICssBuilder | string;
}

export class BasicComponentView  {
    private attr: IHtmlAttributes = {};
    private style: IHtmlStyle = {};
    private readonly cssClass = new CssClass();
    private readonly css: ICssBuilders = {};
    private readonly views: BasicComponentView[] = [];
    private isVisible = true;
    protected readonly elementView: HtmlElementView;

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

    resetOpacity() {
        this.setAttr(attr => attr.opacity = null);
    }

    setOpacity(opacity: number) {
        this.setAttr(attr => attr.opacity = opacity.toString());
    }

    hasElement(element: HTMLElement) {
        return this.elementView.hasElement(element);
    }

    protected setAttr(config: (attr: IHtmlAttributes) => void) {
        config(this.attr);
        const attr = Object.create(this.attr);
        if (Object.keys(this.style).length > 0) {
            attr.style = this.style;
        }
        this.elementView.setAttributes(attr);
    }

    protected setStyle(config: (style: IHtmlStyle) => void) {
        config(this.style);
        let style = this.style;
        if (Object.keys(this.style).length === 0) {
            style = null;
        }
        this.elementView.setAttribute({ style: style }, 'style');
    }

    configure(action: (c: this) => void) {
        action(this);
        return this;
    }

    get offsetWidth() { return this.elementView.offsetWidth; }

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

    addCssFrom(css: CssClass | ICssBuilder) {
        this.cssClass.addFrom(css);
        this.setCssClass();
    }

    private replaceCssName(nameToRemove: string, nameToAdd: string) {
        this.cssClass.removeName(nameToRemove);
        this.cssClass.addName(nameToAdd);
        this.setCssClass();
    }

    hasCssName(name: string) { return this.cssClass.includes(name); }

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
        return new ViewEventBuilder(this.elementView, eventName);
    }

    get viewCount() { return this.views.length; }

    protected getViewByIndex(index: number) { return this.views[index]; }

    protected getViews() { return new EnumerableArray(this.views).value(); }

    dispose() {
        this.disposeAllViews();
        if (this.container) {
            const index = this.container.views.indexOf(this);
            if (index > -1) {
                this.container.views.splice(index, 1);
            }
            this.container.removeView(this);
        }
        else {
            this.unregisterEvents();
        }
    }

    protected disposeAllViews() {
        for (const view of this.views) {
            view.dispose();
        }
        this.views.splice(0, this.views.length);
        this.elementView.replaceElements([]);
    }

    private removeView(view: BasicComponentView) {
        this.elementView.removeElement(view.elementView.element);
        view.unregisterEvents();
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

    moveChildView(childView: BasicComponentView, destinationIndex: number) {
        const sourceIndex = this.views.indexOf(childView);
        if (sourceIndex > -1 && sourceIndex !== destinationIndex) {
            this.views.splice(sourceIndex, 1);
            if (sourceIndex < destinationIndex) {
                destinationIndex--;
            }
            this.views.splice(destinationIndex, 0, childView);
            this.replaceElements();
        }
    }

    private replaceElements() {
        this.unregisterEvents();
        const viewElements = new MappedArray(
            new FilteredArray(
                this.views,
                v => v.isVisible
            ),
            v => v.elementView.element
        ).value();
        this.elementView.replaceElements(viewElements);
        this.registerEvents();
    }

    private unregisterEvents() {
        this.elementView.unregisterEvents();
        for (const view of this.views) {
            view.unregisterEvents();
        }
    }

    private registerEvents() {
        this.elementView.registerEvents();
        for (const view of this.views) {
            view.registerEvents();
        }
    }
}