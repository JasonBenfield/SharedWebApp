import { BasicComponentView } from "../Views/BasicComponentView";
import { AsyncCommand } from "./Command";

export class BasicComponent {
    private readonly components: (BasicComponent | AsyncCommand)[] = [];

    constructor(protected readonly view: BasicComponentView) {
    }

    protected getComponentByElement(element: HTMLElement) {
        for (const component of this.components) {
            if (component instanceof BasicComponent && component.hasElement(element)) {
                return component;
            }
        }
        return null;
    }

    private hasElement(element: HTMLElement) {
        return this.view.hasElement(element);
    }

    protected anyComponents() { return this.components.length > 0; }

    protected getComponent(index: number) { return this.components[index]; }

    protected getComponents() {
        return this.components.map(c => c);
    }

    protected clearComponents() {
        for (const component of this.components) {
            component.dispose();
        }
        this.components.splice(0, this.components.length);
    }

    protected addComponent<T extends BasicComponent | AsyncCommand>(component: T) {
        this.components.push(component);
        return component;
    }

    protected removeComponent(component: BasicComponent | AsyncCommand) {
        component.dispose();
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }

    protected moveComponent(component: BasicComponent, destinationIndex: number) {
        this.view.moveChildView(component.view, destinationIndex);
        const sourceIndex = this.components.indexOf(component);
        if (sourceIndex > -1 && sourceIndex !== destinationIndex) {
            this.components.splice(sourceIndex, 1);
            if (sourceIndex < destinationIndex) {
                destinationIndex--;
            }
            this.components.splice(destinationIndex, 0, component);
        }
    }

    dispose() {
        this.clearComponents();
        this.view.dispose();
        this.onDipose();
    }

    protected onDipose() { }
}