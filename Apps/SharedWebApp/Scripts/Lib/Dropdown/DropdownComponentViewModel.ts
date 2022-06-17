import { ComponentTemplate } from "../ComponentTemplate";
import { ComponentViewModel } from "../ComponentViewModel";
import { ButtonViewModel } from "../Html/ButtonViewModel";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import * as template from './DropdownComponent.html';
import * as ko from 'knockout';

export class DropdownComponentViewModel extends ComponentViewModel {
    constructor() {
        super(new ComponentTemplate('dropdown-component', template));
    }

    readonly isVisible = ko.observable(true);
    readonly button = new ButtonViewModel();
    readonly menu = new UnorderedListViewModel();
}