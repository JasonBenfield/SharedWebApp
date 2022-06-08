import { ListBlockViewModel } from "../Html/ListBlockViewModel";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import { BaseListView } from "./BaseListView";
import { ButtonListGroupItemView } from "./ButtonListGroupItemView";
import { LinkListGroupItemView } from "./LinkListGroupItemView";
import { ListGroupItemView } from "./ListGroupItemView";

export class ListGroupView extends BaseListView {
    static unorderdList(createItemView?: (source?: any) => IListItemView) {
        return new ListGroupView(
            createItemView || (() => new ListGroupItemView()),
            new UnorderedListViewModel()
        );
    }

    static block(createItemView?: (source?: any) => IListItemView) {
        return new ListGroupView(
            createItemView || (() => new LinkListGroupItemView()),
            new ListBlockViewModel()
        );
    }

    constructor(
        createItemView: (source?: any) => IListItemView,
        vm: IListViewModel = new UnorderedListViewModel()
    ) {
        super(createItemView, vm);
        this.addCssName('list-group');
    }

    makeFlush() {
        this.addCssName('list-group-flush');
    }

    addButtonListGroupItem() {
        return this.addButtonListGroupItems(1)[0];
    }

    addButtonListGroupItems(howMany: number) {
        return <ButtonListGroupItemView[]>this.addListItemViews(
            howMany,
            () => new ButtonListGroupItemView()
        );
    }

    addLinkListGroupItem() {
        return this.addLinkListGroupItems(1)[0];
    }

    addLinkListGroupItems(howMany: number) {
        return <LinkListGroupItemView[]>this.addListItemViews(
            howMany,
            () => new LinkListGroupItemView()
        );
    }

    addListGroupItem() {
        return this.addListGroupItems(1)[0];
    }

    addListGroupItems(howMany: number) {
        return <ListGroupItemView[]>this.addListItemViews(
            howMany,
            () => new ListGroupItemView()
        );
    }

}