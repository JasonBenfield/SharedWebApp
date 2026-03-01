import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel } from "./ComponentViewModel";

export interface IComponentFactory {
    create(viewModel: ComponentViewModel, view: ComponentView): Component;
}

export class ComponentFactory {
    private readonly factories: IComponentFactory[] = [];

    constructor(...factories: IComponentFactory[]) {
        this.factories.push(...factories);
    }

    addFactory(factory: IComponentFactory) {
        if (this.factories.indexOf(factory) < 0) {
            this.factories.push(factory);
        }
    }

    create(viewModel: ComponentViewModel, view: ComponentView): Component | null {
        let component: Component | null = null;
        if (!component) {
            for (const factory of this.factories) {
                component = factory.create(viewModel, view);
                if (component) {
                    break;
                }
            }
        }
        return component;
    }
}
