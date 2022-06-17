import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './TextBlock.html';
import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';

export class TextBlockViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('text-block', template));
    }
    readonly text = ko.observable('');
}