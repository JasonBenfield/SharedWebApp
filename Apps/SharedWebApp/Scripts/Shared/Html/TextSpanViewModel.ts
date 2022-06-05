import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './TextSpan.html';
import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';

export class TextSpanViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('text-span', template));
    }
    readonly text = ko.observable('');
    readonly html = ko.observable<string>(null);
}