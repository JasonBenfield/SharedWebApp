import { HorizontalRuleViewModel } from './HorizontalRuleViewModel';
export declare class HorizontalRule implements IComponent {
    protected readonly vm: HorizontalRuleViewModel;
    constructor(vm?: HorizontalRuleViewModel);
    addToContainer(container: IAggregateComponent): this;
    insertIntoContainer(container: IAggregateComponent, index: number): this;
    removeFromContainer(container: IAggregateComponent): this;
    show(): void;
    hide(): void;
}
