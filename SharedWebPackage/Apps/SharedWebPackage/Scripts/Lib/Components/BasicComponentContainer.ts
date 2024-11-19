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

    getComponentByElement: (element: HTMLElement) => BasicComponent;

    anyComponents: () => boolean;

    getComponent: (index: number) => BasicComponent;

    getComponents: () => BasicComponent[];

    clearComponents: () => void;

    addComponent: <T extends BasicComponent | AsyncCommand>(component: T) => T;

    removeComponent: <T extends BasicComponent | AsyncCommand>(component: T) => T;

    moveComponent: <T extends BasicComponent>(component: T, destinationIndex: number) => T;

    insertComponent: <T extends BasicComponent | AsyncCommand>(component: T, destinationIndex: number) => T;
}