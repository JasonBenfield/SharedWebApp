import * as ko from 'knockout';
import { ComponentTemplate } from "../ComponentTemplate";
import { ComponentViewModel } from "../ComponentViewModel";
import * as template from './HorizontalRule.html';

export class HorizontalRuleViewModel extends ComponentViewModel {
    constructor() {
        super(new ComponentTemplate('hr', template));
    }
    readonly isVisible = ko.observable(true);
}