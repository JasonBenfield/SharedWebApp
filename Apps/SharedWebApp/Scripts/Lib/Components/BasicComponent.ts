import { EnumerableArray } from "../Enumerable";
import { BasicComponentView } from "../Views/BasicComponentView";

export class BasicComponent {
    private readonly components: BasicComponent[] = [];

    constructor(protected readonly view: BasicComponentView) {
    }

    protected getComponentByElement(element: HTMLElement) {
        for (const component of this.components) {
            if (component.hasElement(element)) {
                return component;
            }
        }
        return null;
    }

    private hasElement(element: HTMLElement) { return this.view.hasElement(element); }

    protected getComponentByView(view: BasicComponentView) {
        for (const component of this.components) {
            if (component.hasView(view)) {
                return component;
            }
        }
        return null;
    }

    private hasView(view: BasicComponentView) { return this.view.isOrContainsView(view); }

    protected anyComponents() { return this.components.length > 0; }

    protected getComponent(index: number) { return this.components[index]; }

    protected getComponents() {
        return new EnumerableArray(this.components).value();
    }

    protected clearComponents() {
        for (const component of this.components) {
            component.view.dispose();
        }
        this.components.splice(0, this.components.length);
    }

    protected addComponent(component: BasicComponent) {
        this.components.push(component);
    }

    protected removeComponent(component: BasicComponent) {
        component.view.hide();
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }
}