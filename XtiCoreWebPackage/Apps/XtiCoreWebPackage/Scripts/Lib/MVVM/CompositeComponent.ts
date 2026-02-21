import { Component } from "./Component";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";

export type ComponentLayout<T> = {
    [Key in keyof T]: Component;
}

export class CompositeComponent<T extends ComponentLayout<T>> extends Component {
    private readonly _components: Component[] = [];

    constructor(viewModel: ComponentViewModel, view: IComponentView, readonly layout: T) {
        super(viewModel, view);
        for (const key in layout) {
            this.addComponent(layout[key]);
        }
    }

    protected addComponent<TComponentController extends Component>(c: TComponentController) {
        this._components.push(c);
        return c;
    }

    dispose() {
        for (const component of this._components) {
            component.dispose();
        }
        this._components.splice(0, this._components.length);
        super.dispose();
    }
}