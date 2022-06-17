import { HtmlComponentViewModel } from "./HtmlComponentViewModel";
import * as template from './HtmlBlock.html';
import { ComponentTemplate } from "../ComponentTemplate";
import * as ko from 'knockout';

export class HtmlBlockViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('html-block', template));
    }
    readonly html = ko.observable('');
}