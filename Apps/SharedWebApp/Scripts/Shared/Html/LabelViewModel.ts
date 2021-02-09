import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';
import * as template from './Label.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";

export class LabelViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('label', template));
    }

    readonly content = new AggregateComponentViewModel();
    readonly forTarget = ko.observable<string>(null);
}