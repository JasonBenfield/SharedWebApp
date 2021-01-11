import { ComponentTemplate } from "../ComponentTemplate";
import * as template from './CommandOutlineButton.html';
import { CommandViewModel } from '../Command';

export class CommandOutlineButtonTemplate extends ComponentTemplate {
    constructor() {
        super('command-outline-button', template);
    }
}

export function createCommandOutlineButtonViewModel() {
    let commandVM = new CommandViewModel();
    new CommandOutlineButtonTemplate().register();
    commandVM.componentName('command-outline-button');
    return commandVM;
}