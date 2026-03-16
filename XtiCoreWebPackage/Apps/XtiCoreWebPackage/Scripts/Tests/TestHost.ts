import { Component } from "../Lib/MVVM/Component";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { MvvmOptions } from "../Lib/MVVM/MvvmOptions";
import { MvvmHost } from "../Lib/MVVM/MvvmHost";

export class TestHost {
    static readonly value = new TestHost();

    private readonly pageHost = new MvvmHost();

    private constructor() {
        MvvmOptions.configure({
            debouncedViewModelChangedWait: 1
        });
    }

    show(view: ComponentView, component: Component) {
        return this.pageHost.show(view, component);
    }

    immediateHandleChanges() {
        this.pageHost.immediateHandleChanges();
    }

    reset() {
        this.pageHost.reset();
    }
}