import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Link.html';

export class LinkViewModel extends HtmlComponentViewModel {
    readonly content = new AggregateComponentViewModel();
    readonly attr: ko.Observable<IFormAttributes>;
    readonly isEnabled = ko.observable(true);
    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);

    constructor() {
        super(new ComponentTemplate('link', template));
    }
}