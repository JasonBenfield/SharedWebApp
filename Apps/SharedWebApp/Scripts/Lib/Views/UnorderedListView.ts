import { BasicComponentView } from "./BasicComponentView";
import { HtmlElementView } from "./HtmlElementView";
import { ListItemView } from "./ListItemView";
import { IContainerView, ViewConstructor } from "./Types";
import { ViewEventActionBuilder } from "./ViewEventBuilder";

export class UnorderedListView extends BasicComponentView {
    private clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder;

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'ul'));
        this.clickConfig = b => b.select('li').preventDefault();
    }

    configureClick(clickConfig: (builder: ViewEventActionBuilder) => ViewEventActionBuilder) {
        this.clickConfig = clickConfig;
    }

    handleClick(action: (view: ListItemView) => void) {
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