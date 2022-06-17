import * as ko from 'knockout';
import * as template from './ModalComponent.html';
import { ComponentTemplate } from '../ComponentTemplate';
import { ModalOptionsViewModel } from './ModalOptionsViewModel';
import { AggregateComponentViewModel } from '../Html/AggregateComponentViewModel';
import { HtmlComponentViewModel } from '../Html/HtmlComponentViewModel';

export class ModalComponentViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor() {
        super(new ComponentTemplate('modal-component', template));
    }

    readonly content = new AggregateComponentViewModel();
    readonly title = ko.observable('');
    readonly isVisible = ko.observable(false);
    readonly modalOptions = new ModalOptionsViewModel();
}