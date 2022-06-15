import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { HtmlComponentViewModel } from "../Html/HtmlComponentViewModel";
import * as template from './ListBlock.html';

export class ListBlockViewModel extends HtmlComponentViewModel implements IListViewModel {
    constructor() {
        super(new ComponentTemplate('list-block', template));
    }
    readonly items = ko.observableArray<IListItemViewModel>([]);
    readonly hasItems = ko.observable(false);
    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);
}