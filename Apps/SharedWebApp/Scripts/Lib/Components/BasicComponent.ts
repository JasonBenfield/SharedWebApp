import { EnumerableArray, FilteredArray } from "../Enumerable";
import { BasicComponentView } from "../Views/BasicComponentView";

export class BasicComponent {
    private readonly components: BasicComponent[] = [];
    protected readonly view: BasicComponentView;
    protected readonly views: BasicComponentView[] = [];

    constructor(view: BasicComponentView | BasicComponentView[]) {
        if (Array.isArray(view)) {
            this.views.splice(0, this.views.length, ...view);
        }
        else {
            this.views.push(view);
        }
        this.view = this.views[0];
    }

    protected getComponentByElement(element: HTMLElement) {
        for (const component of this.components) {
            if (component.hasElement(element)) {
                return component;
            }
        }
        return null;
    }

    private hasElement(element: HTMLElement) {
        return new FilteredArray(
            this.views,
            view => view.hasElement(element)
        ).toEnumerableArray().any();
    }

    protected anyComponents() { return this.components.length > 0; }

    protected getComponent(index: number) { return this.components[index]; }

    protected getComponents() {
        return new EnumerableArray(this.components).value();
    }

    protected clearComponents() {
        for (const component of this.components) {
            component.dispose();
        }
        this.components.splice(0, this.components.length);
    }

    protected addComponent<T extends BasicComponent>(component: T) {
        this.components.push(component);
        return component;
    }

    protected removeComponent(component: BasicComponent) {
        component.dispose();
        const index = this.components.indexOf(component);
        if (index > -1) {
            this.components.splice(index, 1);
        }
    }

    dispose() {
        this.clearComponents();
        for (const view of this.views) {
            view.dispose();
        }
        this.onDipose();
    }

    protected onDipose() { }
}