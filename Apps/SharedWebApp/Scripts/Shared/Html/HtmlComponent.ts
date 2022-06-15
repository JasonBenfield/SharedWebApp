﻿import { ContextualClass } from "../ContextualClass";
import { CssClass } from "../CssClass";
import { MarginCss } from "../MarginCss";
import { PaddingCss } from "../PaddingCss";
import { TextCss } from "../TextCss";

export class HtmlComponent implements IComponent {
    private attr: IHtmlAttributes = {};
    private style: IHtmlStyle = {};
    private bgContextCss = '';
    private textCss: TextCss;
    private margin: MarginCss = null;
    private padding: PaddingCss = null;
    private readonly css = new CssClass();

    constructor(protected readonly vm: IHtmlComponentViewModel) {
        vm.view = this;
    }

    protected setAttr(config: (attr: IHtmlAttributes) => void) {
        config(this.attr);
        this.vm.attr(this.attr);
    }

    protected setStyle(config: (style: IHtmlStyle) => void) {
        config(this.style);
        this.vm.style(this.style);
    }

    addToContainer(container: IAggregateComponent): this {
        return container.addItem(this.vm, this);
    }

    insertIntoContainer(container: IAggregateComponent, index: number): this {
        return container.insertItem(index, this.vm, this);
    }

    removeFromContainer(container: IAggregateComponent) {
        return container.removeItem(this);
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
        this.vm.isVisible(true);
    }

    hide() {
        this.vm.isVisible(false);
    }
}