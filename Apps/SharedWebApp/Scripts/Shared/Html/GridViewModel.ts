import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Grid.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { AggregateComponentViewModel } from "./AggregateComponentViewModel";
import * as ko from 'knockout';

export class GridViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('grid-component', template));
    }

    readonly content = new AggregateComponentViewModel();

    readonly role = ko.observable<string>(null);

    readonly autoColumns = ko.observable<string>(null);

    readonly autoRows = ko.observable<string>(null);

    readonly templateColumns = ko.observable<string>(null);

    readonly templateRows = ko.observable<string>(null);

    readonly columnGap = ko.observable<string>(null);

    readonly rowGap = ko.observable<string>(null);
}