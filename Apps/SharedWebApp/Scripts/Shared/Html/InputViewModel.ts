import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';
import * as template from './Input.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";

export class InputViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('input', template));
    }
    readonly type = ko.observable('text');
    readonly value = ko.observable('');
    readonly maxLength = ko.observable<number>(null);
    readonly isEnabled = ko.observable(true);
    readonly hasFocus = ko.observable(false);
    readonly autocomplete = ko.observable<string>(null);
}