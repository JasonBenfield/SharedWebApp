import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as template from './Form.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";

export class FormViewModel extends HtmlComponentViewModel {
    readonly attr: ko.Observable<IFormAttributes>;
    readonly xtiEvent = ko.observable<IXtiEventBindingOptions>(null);

    constructor(public readonly content = new AggregateComponentViewModel()) {
        super(new ComponentTemplate('form-component', template));
    }
}