import { ContextualClass } from "../ContextualClass";
import { AggregateComponent } from "../Html/AggregateComponent";
import { HtmlComponent } from "../Html/HtmlComponent";
import { ListItemViewModel } from "../Html/ListItemViewModel";

export class ListGroupItemView extends HtmlComponent implements IListItemView {
    private data: any;

    readonly content = new AggregateComponent(this.vm.content);
    protected readonly vm: IListItemViewModel;
    private contextClass = ContextualClass.default;

    private active = '';

    constructor(vm: IListItemViewModel = new ListItemViewModel()) {
        super(vm);
        this.addCssName('list-group-item');
        if (vm.isClickable) {
            this.addCssName('list-group-item-action');
        }
    }

    getData<T>(): T { return this.data; }

    setData(data: any) { this.data = data; }

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
        let newCss = this.getCss(contextClass);
        this.replaceCssName(this.getCss(this.contextClass), newCss);
        this.contextClass = contextClass;
    }

    private getCss(contextClass: ContextualClass) {
        return contextClass && !contextClass.equals(ContextualClass.default) ?
            contextClass.toString() : '';
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