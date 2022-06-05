import * as ko from 'knockout';
import { DefaultEvent } from "../Events";
import { HtmlComponentViewModel } from "../Html/HtmlComponentViewModel";
import { ComponentTemplate } from "../ComponentTemplate";
import * as template from './ListBlock.html';

export class ListBlockViewModel extends HtmlComponentViewModel implements IListViewModel {
    constructor() {
        super(new ComponentTemplate('list-block', template));
    }
    private readonly _itemClicked = new DefaultEvent<IListItemViewModel>(this);
    readonly itemClicked = this._itemClicked.handler();
    readonly items = ko.observableArray<IListItemViewModel>([]);
    readonly hasItems = ko.observable(false);

    private clickResult: boolean;

    defaultClick() {
        this.clickResult = true;
    }

    overrideDefaultClick() {
        this.clickResult = false;
    }

    click(item: IListItemViewModel) {
        this._itemClicked.invoke(item);
        let clickResult = this.clickResult;
        if (clickResult === undefined) {
            clickResult = true;
        }
        return clickResult;
    }
}