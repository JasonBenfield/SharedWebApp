import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";

export class ContainerComponent extends Component {
    constructor(viewModel: ComponentViewModel, view: ComponentView, ...changeHandlers: ComponentChangeHandler<typeof viewModel, typeof view>[]) {
        super(viewModel, view, ...changeHandlers);
    }

    declare public addComponent: <TComponent extends Component>(c: TComponent) => TComponent;

    addComponents(...components: Component[]) {
        for (const component of components) {
            this.addComponent(component);
        }
    }
}