import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Nav.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';

export class NavViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('nav', template));
    }

    readonly content = new AggregateComponentViewModel();

    readonly role = ko.observable<string>(null);
}