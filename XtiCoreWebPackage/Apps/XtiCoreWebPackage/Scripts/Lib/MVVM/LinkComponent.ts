import { Component } from "./Component";
import { IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { StyleableComponentView } from "./StyleableComponentView";

type LinkTargetType = "" | "_blank";

export class LinkComponentViewModel extends ComponentViewModel {
    constructor(initializer: ComponentViewModelInitializer<LinkComponentViewModel> = {}) {
        super(initializer);
    }

    private _href = "";
    get href() { return this._href; }
    set href(href: string) { this._href = href; }

    private _target: LinkTargetType = "";
    get target() { return this._target; }
    set target(target: LinkTargetType) { this._target = target; }

    private _title = "";
    get title() { return this._title; }
    set title(title: string) { this._title = title; }
}

export interface ILinkComponentView extends IComponentView {
    setHref(href: string): void;
    setTarget(target: string | null): void;
    setTitle(title: string): void;
}

export class LinkComponentView extends StyleableComponentView implements ILinkComponentView {
    constructor() {
        super(() => document.createElement("a"));
    }

    declare setTitle: (title: string) => void;

    setHref(href: string) {
        this.setAttribute("href", href);
    }

    setTarget(target: string) {
        this.setAttribute("target", target === "" ? null : target);
    }
}

export class LinkComponent extends Component {
    constructor(protected readonly viewModel: LinkComponentViewModel, protected readonly view: ILinkComponentView) {
        super(viewModel, view);
    }

    protected handleChanges(changes: ObservableChanges<LinkComponentViewModel>) {
        super.handleChanges(changes);
        if (changes.title) {
            this.view.setTitle(changes.title.value);
        }
        if (changes.href) {
            this.view.setHref(changes.href.value);
        }
        if (changes.target) {
            this.view.setTarget(changes.target.value);
        }
    }

    get href() { return this.viewModel.href; }

    set href(href: string) {
        this.viewModel.href = href;
    }

    get title() { return this.viewModel.title; }

    set title(title: string) {
        this.viewModel.title = title;
    }

    get isTargetBlank() { return this.viewModel.target === "_blank"; }

    setTargetToBlank() {
        this.viewModel.target = "_blank";
    }

    setTargetToDefault() {
        this.viewModel.target = "";
    }
}