import { Component, ComponentChangeHandler } from "./Component";
import { ComponentViewModel } from "./ComponentViewModel";
import { ContainerComponentView } from "./ContainerComponentView";

export class ContainerComponent extends Component {
    constructor(viewModel: ComponentViewModel, view: ContainerComponentView, ...changeHandlers: ComponentChangeHandler[]) {
        super(viewModel, view, ...changeHandlers);
    }

    declare public addComponent: <TComponent extends Component>(c: TComponent) => TComponent;
}