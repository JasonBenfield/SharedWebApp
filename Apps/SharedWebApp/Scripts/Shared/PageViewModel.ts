import { ComponentTemplate } from './ComponentTemplate';
import { ComponentViewModel } from './ComponentViewModel';
import { AggregateComponentViewModel } from './Html/AggregateComponentViewModel';
import { ModalComponentViewModel } from './Modal/ModalComponentViewModel';
import * as template from './Page.html';

export class PageViewModel extends ComponentViewModel implements IPageViewModel {
    constructor() {
        super(new ComponentTemplate('page-body', template));
    }
    readonly content = new AggregateComponentViewModel();
    readonly modalError = new ModalComponentViewModel();
}