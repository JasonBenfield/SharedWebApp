import { ContextualClass } from "../ContextualClass";
import { FaIcon } from "../FaIcon";
import { ICommandItem } from "./CommandItem";
import { LinkView } from "../Html/LinkView";
import { LinkViewModel } from "../Html/LinkViewModel";
export declare class LinkCommandItem extends LinkView implements ICommandItem {
    readonly executeRequested: import("../Events").DefaultEventHandler<any>;
    readonly icon: FaIcon;
    private readonly textSpan;
    private active;
    protected readonly vm: LinkViewModel;
    private context;
    private isOutline;
    constructor(vm?: LinkViewModel);
    positionIconRight(): void;
    setText(text: string): void;
    setActive(): void;
    setInactive(): void;
    private updateActiveCss;
    setContext(context: ContextualClass): void;
    private getContextCss;
    useOutlineStyle(): void;
}
