import { ComponentViewModel } from "../ComponentViewModel";
import * as ko from 'knockout';

export class HtmlComponentViewModel extends ComponentViewModel implements IHtmlComponentViewModel {
    constructor(template: IComponentTemplate) {
        super(template);
    }

    readonly id = ko.observable<string>(null);
    readonly name = ko.observable<string>(null);
    readonly css = ko.observable('');
    readonly isVisible = ko.observable(true);
    readonly title = ko.observable<string>(null);
}