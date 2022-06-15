import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';
import * as template from './Input.html';
import { HtmlComponentViewModel } from "./HtmlComponentViewModel";

export class InputViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('input', template));
    }
    readonly attr: ko.Observable<IFormAttributes>;
    readonly value = ko.observable('');
    readonly isEnabled = ko.observable(true);
    readonly hasFocus = ko.observable(false);
}