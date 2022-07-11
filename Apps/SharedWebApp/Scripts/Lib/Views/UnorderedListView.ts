import { BasicComponentView } from "./BasicComponentView";
import { ListItemView } from "./ListItemView";
import { ViewConstructor } from "./Types";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export class UnorderedListView extends BasicComponentView {
    private clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder;

    constructor(container: BasicComponentView) {
        super(container, 'ul');
        this.clickConfig = b => b.select('li');
    }

    configureClick(clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder) {
        this.clickConfig = clickConfig;
    }

    handleClick(action: (el: HTMLElement) => void) {
        this.clickConfig(this.on('click').execute(action)).subscribe();
    }

    getListItems() { return this.getViews() as ListItemView[]; }

    addListItem<T extends ListItemView>(ctor?: ViewConstructor<T>) {
        return this.addListItems(1, ctor)[0];
    }

    addListItems<T extends ListItemView>(howMany: number, ctor?: ViewConstructor<T>) {
        const listItems: T[] = [];
        for (let i = 0; i < howMany; i++) {
            const listItem = this.addView(ctor || ListItemView) as T;
            listItems.push(listItem);
        }
        return listItems;
    }
}