import { BasicComponentView } from "../Views/BasicComponentView";
import { BasicContainerView } from "../Views/BasicContainerView";
import { BasicComponent } from "./BasicComponent";

export class SingleComponentTypeContainer<TItem extends BasicComponent, TItemView extends BasicComponentView> extends BasicComponent {
    constructor(
        protected readonly view: BasicContainerView,
        private readonly createComponentView: (parentView: BasicContainerView) => TItemView,
        private readonly createComponent: (itemView: TItemView) => TItem
    ) {
        super(view);
    }

    getViewID() {
        return this.view.getViewID();
    }

    getComponentByElement: (element: HTMLElement) => BasicComponent;

    anyComponents: () => boolean;

    getComponent: (index: number) => TItem;

    getComponents: () => TItem[];

    clearComponents: () => void;

    add() {
        const componentView = this.createComponentView(this.view);
        const component = this.createComponent(componentView);
        return this.addComponent(component);
    }

    remove(component: TItem) {
        return this.removeComponent(component);
    }

    move(component: TItem, destinationIndex: number) {
        return this.moveComponent(component, destinationIndex);
    }

    insert(component: TItem, destinationIndex: number) {
        return this.insertComponent(component, destinationIndex);
    }

    show() { this.view.show(); }

    hide() { this.view.hide(); }
}