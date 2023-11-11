import { BasicComponentView } from "./BasicComponentView";
import { LinkCommandView } from "./Command";
import { HtmlElementView } from "./HtmlElementView";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export type IHtmlElementView =
    keyof HTMLElementTagNameMap |
    HTMLElement |
    (() => HtmlElementView);

export interface IHtmlAttributes {
    id?: string;
    name?: string;
    title?: string;
    'class'?: string;
    role?: string;
    draggable?: string;
    opacity?: string;
}

export interface ICitableAttributes extends IHtmlAttributes {
    cite?: string;
}

export interface ILinkAttributes extends IHtmlAttributes {
    href?: string;
    target?: string;
}

export interface IOptionAttributes extends IHtmlAttributes {
    value?: string;
}

export interface ILabelAttributes extends IHtmlAttributes {
    for?: string;
}

export interface IButtonAttributes extends IHtmlAttributes {
    type?: string;
    disabled?: boolean;
}

export interface IFormAttributes extends IHtmlAttributes {
    autocomplete?: string;
    action?: string;
    method?: string;
    target?: string;
}

export interface ITextAreaAttributes extends IHtmlAttributes {
    rows?: string;
    cols?: string;
    maxlength?: string;
    autocomplete?: string;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
}

export interface IInputAttributes extends IHtmlAttributes {
    type?: string;
    inputmode?: string;
    pattern?: string;
    maxlength?: string;
    autocomplete?: string;
    disabled?: boolean;
    readonly?: boolean;
    placeholder?: string;
    accept?: string;
    multiple?: boolean;
}

export interface IHtmlStyle {
    width?: string;
    'min-width'?: string;
    'max-width'?: string;
    height?: string;
    'min-height'?: string;
    'max-height'?: string;
    'z-index'?: string;
    position?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
}

export interface IGridStyle extends IHtmlStyle {
    'grid-template-columns'?: string;
    'grid-template-rows'?: string;
    'grid-auto-columns'?: string;
    'grid-auto-rows'?: string;
    'column-gap'?: string;
    'row-gap'?: string;
}

export interface IGridCellStyle extends IHtmlStyle {
    'grid-column'?: string;
    'grid-row'?: string;
}

export interface IContainerView {
    addView<T extends BasicComponentView>(ctor: ViewConstructor<T>): T;

    addViews<T extends BasicComponentView>(howMany: number, ctor: ViewConstructor<T>): T[];

    insertView<T extends BasicComponentView>(index: number, ctor: ViewConstructor<T>): T;
}

export type ViewConstructor<T extends BasicComponentView> = {
    new(container: BasicComponentView): T;
};

export interface IViewEventOptions {
    readonly name: string;
    readonly action: (source: BasicComponentView) => void;
    readonly selector: string;
    readonly preventDefault: boolean;
}

export interface IFormGroupLayout<T> {
    addFormGroups(view: BasicComponentView): T;
}

export type IClickConfig = (builder: ViewEventActionBuilder) => ViewEventActionBuilder;

export interface ITextComponentView {
    show();
    hide();
    getText(): string;
    setText(text: string);
    setTitle(title: string);
}

export interface ILinkView {
    setHref(href: string);
    setTarget(target: TargetValue);
}

export interface IImgAttributes extends IHtmlAttributes {
    src?: string;
    alt?: string;
    width?: string;
    height?: string;
}

export interface IMenuView {
    addMenuItem(): LinkCommandView;
}

export type TargetValue = '_blank' | '_self' | '_parent' | '_top';
