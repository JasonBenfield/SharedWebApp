import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "./BasicComponentView";
import { FaIconView } from "./FaIconView";
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
    style?: IHtmlStyle;
}

export interface ILinkAttributes extends IHtmlAttributes {
    href?: string;
}

export interface IOptionAttributes extends IHtmlAttributes {
    value?: string;
}

export interface ILabelAttributes extends IHtmlAttributes {
    for?: string;
}

export interface IButtonAttributes extends IHtmlAttributes {
    type?: string;
}

export interface IFormAttributes extends IHtmlAttributes {
    autocomplete?: string;
    action?: string;
    method?: string;
}

export interface IInputAttributes extends IHtmlAttributes {
    type?: string;
    maxlength?: string;
    autocomplete?: string;
    disabled?: boolean;
}

export interface IHtmlStyle {
    width?: string;
    'min-width'?: string;
    'max-width'?: string;
    height?: string;
    'min-height'?: string;
    'max-height'?: string;
    'z-index'?: string;
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

export type ViewConstructor<T extends BasicComponentView> = {
    new(container: BasicComponentView): T;
};

export interface IViewEventOptions {
    readonly name: string;
    readonly action: (source: BasicComponentView) => void;
    readonly selector: string;
    readonly preventDefault: boolean;
}

export interface ICommandView {
    readonly icon: FaIconView;
    positionIconRight();
    setText(text: string);
    setTitle(text: string);
    setContext(contextualClass: ContextualClass);
    setActive();
    setInactive();
    show();
    hide();
    enable();
    disable();
    handleClick(action: () => void);
}

export interface IFormGroupLayout<T> {
    addFormGroups(view: BasicComponentView): T;
}

export type IClickConfig = (builder: ViewEventActionBuilder) => ViewEventActionBuilder;