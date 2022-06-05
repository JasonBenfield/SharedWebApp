import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './HtmlSpan.html';
import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';

export class HtmlSpanViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('html-span', template));
    }
    readonly html = ko.observable<string>('');
}