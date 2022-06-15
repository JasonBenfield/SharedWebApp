
export class ListItem {
    constructor(protected readonly view: IListItemView) {
    }

    isView(view: IListItemView) { return this.view === view; }

    removeFromList(list: IListView) { this.view.removeFromList(list); }
}