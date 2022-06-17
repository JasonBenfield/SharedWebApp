import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Grid.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';

export class GridViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('grid-component', template));
    }

    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);
    readonly content = new AggregateComponentViewModel();
}