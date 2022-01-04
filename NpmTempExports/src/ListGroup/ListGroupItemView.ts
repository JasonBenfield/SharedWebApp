import { ContextualClass } from "../ContextualClass";
import { AggregateComponent } from "../Html/AggregateComponent";
import { HtmlComponent } from "../Html/HtmlComponent";
import { ListItemViewModel } from "../Html/ListItemViewModel";

export class ListGroupItemView extends HtmlComponent implements IListItemView {
    protected readonly vm: IListItemViewModel;
    readonly content: AggregateComponent;
    private contextClass = ContextualClass.default;
    private active = '';

    constructor(vm: IListItemViewModel = new ListItemViewModel()) {
        super(vm);
        this.content = new AggregateComponent(this.vm.content);
        this.addCssName('list-group-item');
        if (vm.isClickable) {
            this.addCssName('list-group-item-action');
        }
    }

    addToList(list: IListView) {
        list.addFromListItem(this.vm, this);
        return this;
    }

    removeFromList(list: IListView) {
        list.removeFromListItem(this.vm, this);
        return this;
    }

    addContent<TItem extends IComponent>(item: TItem) {
        return item.addToContainer(this.content);
    }

    setContext(contextClass: ContextualClass) {
        let newCss = this.getListGroupItemContextCss(contextClass);
        this.replaceCssName(this.getListGroupItemContextCss(this.contextClass), newCss);
        this.contextClass = contextClass;
    }

    private getListGroupItemContextCss(contextClass: ContextualClass) {
        return contextClass && !contextClass.equals(ContextualClass.default) ?
            contextClass.append('list-group-item').toString() : '';
    }

    activate() {
        this.setActive('active');
    }

    deactivate() {
        this.setActive('');
    }

    private setActive(active: string) {
        if (this.active) {
            this.removeCssName(this.active);
        }
        this.active = active;
        this.addCssName(this.active);
    }
}