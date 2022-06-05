import * as ko from 'knockout';
import * as template from './UnorderedList.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { ListItemViewModel } from "./ListItemViewModel";
import { DefaultEvent } from "../Events";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";

export class UnorderedListViewModel extends HtmlComponentViewModel implements IListViewModel {
    constructor() {
        super(new ComponentTemplate('unordered-list', template));
    }
    readonly items = ko.observableArray<ListItemViewModel>([]);
    readonly hasItems = ko.observable(false);

    private readonly _itemClicked = new DefaultEvent<ListItemViewModel>(this);
    readonly itemClicked = this._itemClicked.handler();

    private clickResult: boolean;

    defaultClick() {
        this.clickResult = true;
    }

    overrideDefaultClick() {
        this.clickResult = false;
    }

    click(listItem: ListItemViewModel) {
        this._itemClicked.invoke(listItem);
        let clickResult = this.clickResult;
        if (clickResult === undefined) {
            clickResult = true;
        }
        return clickResult;
    }
}