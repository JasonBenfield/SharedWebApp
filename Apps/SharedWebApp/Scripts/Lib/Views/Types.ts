import { BasicComponentView } from "./BasicComponentView";

export interface IContainerView {
    addElement(el: HTMLElement);

    removeElement(el: HTMLElement);
}


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

interface IHtmlStyle {
    width?: string;
    'min-width'?: string;
    'max-width'?: string;
    height?: string;
    'min-height'?: string;
    'max-height'?: string;
    'z-index'?: string;
}

export type ViewConstructor<T extends BasicComponentView> = {
    new(container: IContainerView): T;
};

export interface IViewEventOptions {
    readonly name: string;
    readonly action: (source: BasicComponentView) => void;
    readonly selector: string;
    readonly preventDefault: boolean;
}