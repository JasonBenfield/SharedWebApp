import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './GridCell.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';

export class GridCellViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('grid-cell', template));
    }

    readonly content = new AggregateComponentViewModel();

    readonly role = ko.observable<string>(null);

    readonly gridRow = ko.observable<string>(null);

    readonly gridColumn = ko.observable<string>(null);
}