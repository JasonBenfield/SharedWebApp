import * as ko from 'knockout';
import { ModalOptionsViewModel } from './ModalOptionsViewModel';
import { AggregateComponentViewModel } from '../Html/AggregateComponentViewModel';
import { HtmlComponentViewModel } from '../Html/HtmlComponentViewModel';
export declare class ModalComponentViewModel extends HtmlComponentViewModel implements IHtmlContainerComponentViewModel {
    constructor();
    readonly content: AggregateComponentViewModel;
    readonly title: ko.Observable<string>;
    readonly isVisible: ko.Observable<boolean>;
    readonly modalOptions: ModalOptionsViewModel;
}
