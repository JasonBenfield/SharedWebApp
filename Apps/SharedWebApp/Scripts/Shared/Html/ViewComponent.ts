export class ViewComponent implements IComponent {
    constructor(protected readonly view: IComponent) {
    }

    addToContainer(container: IAggregateComponent) {
        this.view.addToContainer(container);
        return this;
    }

    insertIntoContainer(container: IAggregateComponent, index: number) {
        this.view.insertIntoContainer(container, index);
        return this;
    }

    removeFromContainer(container: IAggregateComponent) {
        this.view.removeFromContainer(container);
        return this;
    }
}