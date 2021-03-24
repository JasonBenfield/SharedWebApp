import { ComponentTemplate } from "../ComponentTemplate";
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './Select.html';
import * as ko from 'knockout';
import { SelectOption } from "./SelectOption";
import { DefaultEvent } from "../Events";

export class SelectViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('select', template));
    }

    readonly isEnabled = ko.observable(true);
    readonly value = ko.observable<any>(null);
    readonly items = ko.observableArray<SelectOption<any>>([]);
    readonly itemsText = ko.observable('displayText');
    readonly itemsValue = ko.observable('value');
    readonly itemsCaption = ko.observable('');
    readonly hasFocus = ko.observable(false);
}