import { DelayedAction } from "../DelayedAction";
import { Component } from "./Component";
import { ComponentView } from "./ComponentView";
import { ContainerComponentView } from "./ContainerComponentView";
import { MvvmOptions } from "./MvvmOptions";

class RootView extends ContainerComponentView {
    constructor() {
        const rootElement = document.body.appendChild(document.createElement("div"));
        super(() => rootElement);
        this.isParentRequired = false;
        this.setAttributes({ "id": "mvvmRoot", "style": "display: content;" });
        this.hide();
    }
}

export class MvvmHost {
    private readonly view: ContainerComponentView;
    private readonly components: Component[] = [];

    constructor() {
        this.view = new RootView();
        if (typeof PointerEvent === "undefined") {
            const win: any = window;
            win.PointerEvent = MouseEvent;
        }
    }

    show(view: ComponentView, component: Component) {
        this.view.addChildView(view);
        this.components.push(component);
        this.view.show();
        this.immediateHandleChanges();
    }

    waitForChangeNotifications() {
        return DelayedAction.delay(MvvmOptions.value.debouncedViewModelChangedWait + 10);
    }

    immediateHandleChanges() {
        for (const component of this.components) {
            component.immediateHandleChanges();
        }
    }

    reset() {
        const components = this.components.splice(0, this.components.length);
        for (const component of components) {
            component.dispose();
        }
        this.view.removeAllChildViews();
    }
}
