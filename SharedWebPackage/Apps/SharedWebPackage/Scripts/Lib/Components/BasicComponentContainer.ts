import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicComponent } from "./BasicComponent";
import { AsyncCommand } from "./Command";

export class BasicComponentContainer extends BasicComponent {
    constructor(protected readonly view: BasicComponentView) {
        super(view);
    }

    getViewID() {
        return this.view.getViewID();
    }

    declare getComponentByElement: (element: HTMLElement) => BasicComponent;

    declare anyComponents: () => boolean;

    declare getComponent: (index: number) => BasicComponent;

    declare getComponents: () => BasicComponent[];

    declare clearComponents: () => void;

    declare addComponent: <T extends BasicComponent | AsyncCommand>(component: T) => T;

    declare removeComponent: <T extends BasicComponent | AsyncCommand>(component: T) => T;

    declare moveComponent: <T extends BasicComponent>(component: T, destinationIndex: number) => T;

    declare insertComponent: <T extends BasicComponent | AsyncCommand>(component: T, destinationIndex: number) => T;
}