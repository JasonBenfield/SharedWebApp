import { Component } from "../Lib/MVVM/Component";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { MvvmOptions } from "../Lib/MVVM/MvvmOptions";
import { MvvmHost } from "../Lib/MVVM/MvvmHost";

export class AppHost {
    static readonly value = new AppHost();

    private readonly page = new MvvmHost();

    private constructor() {
        MvvmOptions.configure({
            debouncedViewModelChangedWait: 1
        });
    }

    show(view: ComponentView, component: Component) {
        this.page.show(view, component);
    }

    immediateHandleChanges() {
        this.page.immediateHandleChanges();
    }

    reset() {
        this.page.reset();
    }
}