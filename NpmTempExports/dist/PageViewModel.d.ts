import { ComponentViewModel } from './ComponentViewModel';
import { AggregateComponentViewModel } from './Html/AggregateComponentViewModel';
import { ModalComponentViewModel } from './Modal/ModalComponentViewModel';
export declare class PageViewModel extends ComponentViewModel {
    constructor();
    readonly content: AggregateComponentViewModel;
    readonly modalError: ModalComponentViewModel;
}
