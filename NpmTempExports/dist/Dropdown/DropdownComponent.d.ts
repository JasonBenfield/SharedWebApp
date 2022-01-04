import { UnorderedList } from "../Html/UnorderedList";
import { DropdownButton } from "./DropdownButton";
import { DropdownComponentViewModel } from "./DropdownComponentViewModel";
import { DropdownLinkItem } from "./DropdownLinkItem";
import { DropdownSpanItem } from "./DropdownSpanItem";
export declare class DropdownComponent implements IComponent {
    private readonly createItemView;
    private readonly vm;
    readonly button: DropdownButton;
    readonly menu: UnorderedList;
    constructor(createItemView?: (source?: any) => IListItemView, vm?: DropdownComponentViewModel);
    addToContainer(container: IAggregateComponent): any;
    insertIntoContainer(container: IAggregateComponent, index: number): this;
    removeFromContainer(container: IAggregateComponent): any;
    addSpanItem(): DropdownSpanItem;
    addLinkItem(): DropdownLinkItem;
    show(): void;
    hide(): void;
}
