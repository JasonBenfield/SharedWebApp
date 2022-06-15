import { ComponentViewModel } from "../ComponentViewModel";
import * as ko from 'knockout';

export class HtmlComponentViewModel extends ComponentViewModel implements IHtmlComponentViewModel {
    constructor(template: IComponentTemplate) {
        super(template);
    }

    readonly attr = ko.observable<IHtmlAttributes>(null);
    readonly style = ko.observable<IHtmlStyle>(null);
    readonly css = ko.observable('');
    readonly isVisible = ko.observable(true);
}