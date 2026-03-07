import { Component } from "../Lib/MVVM/Component";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { MvvmOptions } from "../Lib/MVVM/MvvmOptions";
import { MvvmPage } from "../Lib/MVVM/MvvmPage";

export class TestPage {
    static readonly value = new TestPage();

    private readonly page = new MvvmPage();

    private constructor() {
        MvvmOptions.configure({
            debouncedViewModelChangedWait: 1
        });
        if (typeof PointerEvent === "undefined") {
            const win: any = window;
            win.PointerEvent = MouseEvent;
        }
    }

    async show(view: ComponentView, component: Component) {
        return this.page.show(view, component);
    }

    waitForChangeNotifications() {
        return this.page.waitForChangeNotifications();
    }

    reset() {
        this.page.reset();
    }
}