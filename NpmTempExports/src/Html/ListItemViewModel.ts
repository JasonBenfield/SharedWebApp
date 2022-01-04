import * as template from './ListItem.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { AggregateComponentViewModel } from './AggregateComponentViewModel';

export class ListItemViewModel extends HtmlComponentViewModel implements IListItemViewModel {
    constructor() {
        super(new ComponentTemplate('list-item', template));
    }

    readonly content = new AggregateComponentViewModel();
    readonly isClickable = false;
}