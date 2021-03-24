import { ComponentTemplate } from './ComponentTemplate';
import { ComponentViewModel } from './ComponentViewModel';
import { ModalErrorComponentViewModel } from './Error/ModalErrorComponentViewModel';
import { AggregateComponentViewModel } from './Html/AggregateComponentViewModel';
import * as template from './Page.html';

export class PageViewModel extends ComponentViewModel implements IPageViewModel {
    constructor() {
        super(new ComponentTemplate('page-body', template));
    }
    readonly content = new AggregateComponentViewModel();
    readonly modalError = new ModalErrorComponentViewModel();
}