import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Nav.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';

export class NavViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('nav', template));
    }

    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);

    readonly content = new AggregateComponentViewModel();
}