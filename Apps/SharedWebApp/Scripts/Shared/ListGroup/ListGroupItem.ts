import { ContextualClass } from "../ContextualClass";
import { AggregateComponent } from "../Html/AggregateComponent";
import { HtmlComponent } from "../Html/HtmlComponent";

export class ListGroupItem extends HtmlComponent implements IListItem {
    constructor(vm: IListItemViewModel) {
        super(vm);
        this.addCssName('list-group-item');
        if (vm.isClickable) {
            this.addCssName('list-group-item-action');
        }
    }

    private data: any;

    getData<T>(): T { return this.data; }

    setData(data: any) { this.data = data; }

    addToList(list: IList) {
        list.addListItem(this.vm, this);
        return this;
    }

    readonly content = new AggregateComponent(this.vm.content);

    addContent<TItem extends IComponent>(item: TItem) {
        return item.addToContainer(this.content);
    }

    protected readonly vm: IListItemViewModel;
    private contextClass = ContextualClass.default;

    setContext(contextClass: ContextualClass) {
        let newCss = this.getCss(contextClass);
        this.replaceCssName(this.getCss(this.contextClass), newCss);
        this.contextClass = contextClass;
    }

    private getCss(contextClass: ContextualClass) {
        return contextClass && !contextClass.equals(ContextualClass.default) ?
            contextClass.toString() : '';
    }

    private active = '';

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