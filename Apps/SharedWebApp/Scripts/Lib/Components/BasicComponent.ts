import { BasicComponentView } from "../Views/BasicComponentView";
import { AsyncCommand } from "./Command";

export class BasicComponent {
    private readonly _components: (BasicComponent | AsyncCommand)[] = [];

    constructor(protected readonly view: BasicComponentView) {
    }

    getViewID() {
        return this.view.getViewID();
    }
    
    protected getComponentByElement(element: HTMLElement) {
        for (const component of this._components) {
            if (component instanceof BasicComponent && component.hasElement(element)) {
                return component;
            }
        }
        return null;
    }

    private hasElement(element: HTMLElement) {
        return this.view.hasElement(element);
    }

    protected anyComponents() { return this._components.length > 0; }

    protected getComponent(index: number) { return this._components[index]; }

    protected getComponents() {
        return this._components.map(c => c);
    }

    protected clearComponents() {
        for (const component of this._components) {
            component.dispose();
        }
        this._components.splice(0, this._components.length);
    }

    protected addComponent<T extends BasicComponent | AsyncCommand>(component: T) {
        this._components.push(component);
        return component;
    }

    protected removeComponent(component: BasicComponent | AsyncCommand) {
        component.dispose();
        const index = this._components.indexOf(component);
        if (index > -1) {
            this._components.splice(index, 1);
        }
    }

    protected moveComponent(component: BasicComponent, destinationIndex: number) {
        this.view.moveChildView(component.view, destinationIndex);
        const sourceIndex = this._components.indexOf(component);
        if (sourceIndex > -1 && sourceIndex !== destinationIndex) {
            this._components.splice(sourceIndex, 1);
            if (sourceIndex < destinationIndex) {
                destinationIndex--;
            }
            this._components.splice(destinationIndex, 0, component);
        }
    }

    protected insertComponent(component: BasicComponent, destinationIndex: number) {
        this._components.splice(destinationIndex, 0, component);
        return component;
    }

    dispose() {
        this.clearComponents();
        this.view.dispose();
        this.onDipose();
    }

    protected onDipose() { }
}