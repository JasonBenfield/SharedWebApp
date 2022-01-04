import { ModalErrorComponentView } from "./Error/ModalErrorComponentView";
import { Block } from "./Html/Block";
import { TextSmallView } from "./Html/TextSmallView";
import { TextSpanView } from "./Html/TextSpanView";
import { Toolbar } from "./Html/Toolbar";
import { PageViewModel } from "./PageViewModel";
export declare class PageFrameView {
    private readonly vm;
    readonly toolbar: Toolbar;
    readonly appTitle: TextSpanView;
    readonly pageTitle: TextSmallView;
    private readonly outerContent;
    readonly content: Block;
    readonly modalError: ModalErrorComponentView;
    private readonly logoutMenuItem;
    constructor(vm?: PageViewModel);
    setName(name: string): void;
    addItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(itemVM: TItemVM, item: TItem): TItem;
    insertItem<TItemVM extends IComponentViewModel, TItem extends IComponent>(index: number, itemVM: TItemVM, item: TItem): TItem;
    removeItem<TItem extends IComponent>(item: TItem): any;
    show(): void;
    hide(): void;
    insertContent<TItem extends IComponent>(index: number, item: TItem): TItem;
    addContent<TItem extends IComponent>(item: TItem): TItem;
    load(): void;
}
