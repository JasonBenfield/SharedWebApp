import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { ListItemViewModel } from "./ListItemViewModel";
import * as template from './UnorderedList.html';

export class UnorderedListViewModel extends HtmlComponentViewModel implements IListViewModel {
    constructor() {
        super(new ComponentTemplate('unordered-list', template));
    }

    readonly items = ko.observableArray<ListItemViewModel>([]);
    readonly hasItems = ko.observable(false);
    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);
}