import { ContextualClass } from "../ContextualClass";
import { AggregateComponent } from "../Html/AggregateComponent";
import { HtmlComponent } from "../Html/HtmlComponent";
export declare class ListGroupItemView extends HtmlComponent implements IListItemView {
    protected readonly vm: IListItemViewModel;
    readonly content: AggregateComponent;
    private contextClass;
    private active;
    constructor(vm?: IListItemViewModel);
    addToList(list: IListView): this;
    removeFromList(list: IListView): this;
    addContent<TItem extends IComponent>(item: TItem): TItem;
    setContext(contextClass: ContextualClass): void;
    private getListGroupItemContextCss;
    activate(): void;
    deactivate(): void;
    private setActive;
}
