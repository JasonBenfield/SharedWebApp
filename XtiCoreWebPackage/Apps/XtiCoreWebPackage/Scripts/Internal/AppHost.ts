import { Component } from "../Lib/MVVM/Component";
import { ComponentView } from "../Lib/MVVM/ComponentView";
import { MvvmHost } from "../Lib/MVVM/MvvmHost";
import { PageFrameView } from "../Lib/MVVM/PageFrame";

export class AppHost {
    static readonly value = new AppHost();

    private readonly page = new MvvmHost();
    private readonly frameView = new PageFrameView();

    private constructor() {
    }

    show(view: ComponentView, component: Component) {
        this.frameView.addContent(view);
        this.page.show(this.frameView, component);
    }

    immediateHandleChanges() {
        this.page.immediateHandleChanges();
    }

    reset() {
        this.page.reset();
    }
}