import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { HtmlElementView } from "./HtmlElementView";
import { ListItemView } from "./ListItemView";
import { IContainerView, ViewConstructor } from "./Types";

export class UnorderedListView extends BasicComponentView {
    private readonly view: BasicContainerView;

    constructor(container: IContainerView) {
        super(HtmlElementView.fromTag(container, 'ul'));
        this.view = new BasicContainerView(this.elementView);
    }

    getListItems() { return this.view.getViews() as ListItemView[]; }

    addListItem<T extends ListItemView>(ctor?: ViewConstructor<T>) {
        return this.addListItems(1, ctor)[0];
    }

    addListItems<T extends ListItemView>(howMany: number, ctor?: ViewConstructor<T>) {
        const listItems: T[] = [];
        for (let i = 0; i < howMany; i++) {
            const listItem = this.view.addView(ctor || ListItemView) as T;
            listItems.push(listItem);
        }
        return listItems;
    }
}