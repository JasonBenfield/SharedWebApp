import { HorizontalRuleViewModel } from './HorizontalRuleViewModel';

export class HorizontalRule implements IComponent {
    protected readonly vm: HorizontalRuleViewModel;

    constructor(vm: HorizontalRuleViewModel = new HorizontalRuleViewModel()) {
        this.vm = vm;
    }

    addToContainer(container: IAggregateComponent): this {
        return container.addItem(this.vm, this);
    }

    insertIntoContainer(container: IAggregateComponent, index: number): this {
        return container.insertItem(index, this.vm, this);
    }

    removeFromContainer(container: IAggregateComponent): this {
        return container.removeItem(this);
    }

    show() {
        this.vm.isVisible(true);
    }

    hide() {
        this.vm.isVisible(false);
    }
}