import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as template from './Button.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";

export class ButtonViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('button', template));
    }

    readonly content = new AggregateComponentViewModel();
    readonly isEnabled = ko.observable(true);
    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);
}