import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import * as template from './HorizontalRule.html';
import { HtmlComponentViewModel } from './HtmlComponentViewModel';

export class ColViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplate('col', template));
    }
    readonly isVisible = ko.observable(true);
}