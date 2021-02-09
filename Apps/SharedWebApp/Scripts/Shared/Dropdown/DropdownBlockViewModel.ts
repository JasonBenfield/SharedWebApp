import { ComponentTemplate } from "../ComponentTemplate";
import { BlockViewModel } from "../Html/BlockViewModel";
import { ButtonViewModel } from "../Html/ButtonViewModel";
import { UnorderedListViewModel } from "../Html/UnorderedListViewModel";
import * as template from './DropdownBlock.html';

export class DropdownBlockViewModel extends BlockViewModel {
    constructor() {
        super();
        let componentTemplate = new ComponentTemplate('dropdown-block', template);
        componentTemplate.register();
        this.componentName(componentTemplate.name);
    }

    readonly button = new ButtonViewModel();
    readonly menu = new UnorderedListViewModel();
}