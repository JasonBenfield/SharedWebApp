import { ContextualClass } from "../ContextualClass";
import { CssClass } from "../CssClass";
import { CssLengthUnit } from "../Html/CssLengthUnit";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";
import { HtmlElementView } from "./HtmlElementView";
import { IHtmlAttributes } from './Types';
import { ViewEventBuilder } from "./ViewEventBuilder";

export class BasicComponentView {
    private attr: IHtmlAttributes = {
        style: {}
    };
    private bgContextCss = '';
    private textCss: TextCss;
    private margin: MarginCss = null;
    private padding: PaddingCss = null;
    private readonly css = new CssClass();

    constructor(protected readonly elementView: HtmlElementView) {
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

    setID(id: string) {
        this.setAttr(attr => attr.id = id);
    }

    setName(name: string) {
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
        let css = contextClass.append('bg');
        this.replaceCssName(this.bgContextCss, css);
        this.bgContextCss = css;
    }

    setTextCss(textCss: TextCss) {
        this.replaceCssName(
            this.textCss && this.textCss.cssClass().toString(),
            textCss && textCss.cssClass().toString()
        );
        this.textCss = textCss;
    }

    setMargin(margin: MarginCss) {
        this.replaceCssName(
            this.margin && this.margin.cssClass().toString(),
            margin && margin.cssClass().toString()
        );
        this.margin = margin;
    }

    setPadding(padding: PaddingCss) {
        this.replaceCssName(
            this.padding && this.padding.cssClass().toString(),
            padding && padding.cssClass().toString()
        );
        this.padding = padding;
    }

    replaceCss(css: CssClass) {
        this.clearCss();
        return this.addCssFrom(css);
    }

    clearCss() {
        this.css.clear();
        this.updateVmCss();
    }

    addCssFrom(css: CssClass | ICssBuilder) {
        this.css.addFrom(css);
        this.updateVmCss();
    }

    replaceCssName(nameToRemove: string, nameToAdd: string) {
        this.css.removeName(nameToRemove);
        this.css.addName(nameToAdd);
        this.updateVmCss();
    }

    addCssName(name: string) {
        this.css.addName(name);
        this.updateVmCss();
    }

    removeCssName(name: string) {
        this.css.removeName(name);
        this.updateVmCss();
    }

    private updateVmCss() {
        this.setAttr(attr => attr.class = this.css.toString());
    }

    setTitle(title: string) {
        this.setAttr(attr => attr.title = title);
    }

    show() {
        this.elementView.addToContainer();
    }

    hide() {
        this.elementView.removeFromContainer();
    }

    on(eventName: string) {
        return new ViewEventBuilder(this, this.elementView, eventName);
    }
}