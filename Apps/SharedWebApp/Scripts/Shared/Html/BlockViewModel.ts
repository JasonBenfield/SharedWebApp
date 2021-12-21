import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Block.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';

export class BlockViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('block', template));
    }

    readonly content = new AggregateComponentViewModel();

    readonly role = ko.observable<string>(null);
}