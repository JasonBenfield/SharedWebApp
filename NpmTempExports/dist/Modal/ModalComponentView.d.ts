import { Block } from '../Html/Block';
import { HtmlContainerComponent } from '../Html/HtmlContainerComponent';
import { ModalComponentViewModel } from './ModalComponentViewModel';
export declare class ModalComponentView extends HtmlContainerComponent {
    readonly closed: IEventHandler<any>;
    readonly header: Block;
    readonly body: Block;
    readonly footer: Block;
    protected readonly vm: ModalComponentViewModel;
    constructor(vm?: ModalComponentViewModel);
    addToContainer(container: IAggregateComponent): any;
    insertIntoContainer(container: IAggregateComponent, index: number): this;
    removeFromContainer(container: IAggregateComponent): any;
    setBackdrop(backdrop: boolean | 'static'): void;
    showModal(): void;
    hideModal(): void;
}
