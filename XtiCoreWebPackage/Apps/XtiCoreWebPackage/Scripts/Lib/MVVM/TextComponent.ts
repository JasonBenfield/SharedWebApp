import { Component, ComponentChangeHandler } from "./Component";
import { IComponentFactory } from "./ComponentFactory";
import { ComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, ObservableChanges } from "./ComponentViewModel";
import { IStyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor, ITitleView, ITitleViewModel } from "./Types";

export interface ITextViewModel {
    get text(): string;
    set text(text: string);
}

export interface ISynchedTitleViewModel {
    get isTitleSynchedWithText(): boolean;
    set isTitleSynchedWithText(title: boolean);
}

export type BaseTextComponentView = ComponentView & ITextView & ITitleView;

export function TitleViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements ITitleViewModel {
        private _title = "";
        get title() { return this._title; }
        set title(title: string) { this._title = title; }
    };
}

export function TextViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements ITextViewModel {
        private _text = "";
        get text() { return this._text; }
        set text(text: string) { this._text = text; }
    };
}

export function SynchedTitleViewModelMixin<T extends Constructor<ComponentViewModel>>(Base: T) {
    return class extends Base implements ISynchedTitleViewModel {
        private _isTitleSynchedWithText = false;
        get isTitleSynchedWithText() { return this._isTitleSynchedWithText; }
        set isTitleSynchedWithText(title: boolean) { this._isTitleSynchedWithText = title; }
    };
}


export type BaseTextComponentViewModel = ComponentViewModel & ITextViewModel & ITitleViewModel & ISynchedTitleViewModel;

export class TextComponentViewModel extends SynchedTitleViewModelMixin(TextViewModelMixin(TitleViewModelMixin(ComponentViewModel))) {
    constructor(initializer: ComponentViewModelInitializer<TextComponentViewModel> = {}) {
        super(initializer);
    }
}

export function TitleViewMixin<T extends Constructor<IStyleableComponentView>>(Base: T) {
    return class extends Base implements ITitleView {
        setTitle(title: string) {
            this.setAttributes({ "title": title });
        }
    };
}

export function TextViewMixin<T extends Constructor<ComponentView>>(Base: T) {
    return class extends Base implements ITextView {
        private _text = "";

        setText(text: string) {
            this._text = text;
            this.updateElementText();
        }

        protected addToDom(index: number) {
            super.addToDom(index);
            this.updateElementText();
        }

        private updateElementText() {
            const element = this.element;
            if (element) {
                element.innerText = this._text;
            }
        }
    };
}

export interface ITextView {
    setText(text: string): void;
}

export class TextComponentView extends TextViewMixin(TitleViewMixin(StyleableComponentViewMixin(ComponentView))) {
    static block() {
        return new TextComponentView("div");
    }

    static span() {
        return new TextComponentView("span");
    }

    static label() {
        return new TextComponentView("label");
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new TextComponentView(`h${size}`);
    }

}

export class TextChangeHandler extends ComponentChangeHandler<ComponentViewModel & ITextViewModel, BaseTextComponentView> {
    handleChanges(changes: ObservableChanges<ComponentViewModel & ITextViewModel>) {
        if (changes.text) {
            const text = changes.text.value;
            this.updateView(v => v.setText(text));
        }
    }
}

export class TitleChangeHandler extends ComponentChangeHandler<ComponentViewModel & ITitleViewModel, ComponentView & ITitleView> {
    handleChanges(changes: ObservableChanges<ComponentViewModel & ITitleViewModel>) {
        if (changes.title) {
            const title = changes.title.value;
            this.updateView(v => v.setTitle(title));
        }
    }
}

export class SynchedTitleChangeHandler extends ComponentChangeHandler<BaseTextComponentViewModel, ComponentView & ITextView & ITitleView> {

    handleChanges(changes: ObservableChanges<BaseTextComponentViewModel>) {
        if (changes.text || changes.isTitleSynchedWithText) {
            if (this.viewModel.isTitleSynchedWithText) {
                const title = this.viewModel.text;
                this.updateView(v => v.setTitle(title));
            }
        }
    }
}

export function TitleComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: ComponentViewModel & ITitleViewModel;

        get title() { return this.viewModel.title; }

        set title(title: string) {
            this.viewModel.title = title;
        }
    };
}

export function TextComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: ComponentViewModel & ITextViewModel;

        get text() { return this.viewModel.text; }

        set text(text: string) {
            this.viewModel.text = text;
        }
    };
}

export function SynchedTitleComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base {
        declare protected readonly viewModel: ComponentViewModel & ITextViewModel & ITitleViewModel & ISynchedTitleViewModel;

        synchTitleWithText() {
            this.viewModel.isTitleSynchedWithText = true;
        }

        stopSynchTitleWithText() {
            this.viewModel.isTitleSynchedWithText = false;
        }
    };
}

export class TextComponent extends SynchedTitleComponentMixin(TextComponentMixin(TitleComponentMixin(Component))) {
    constructor(viewModel: BaseTextComponentViewModel, view: BaseTextComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(viewModel, view),
            new TextChangeHandler(viewModel, view),
            new SynchedTitleChangeHandler(viewModel, view)
        );
    }
}

export class TextComponentFactory implements IComponentFactory {
    create(viewModel: BaseTextComponentViewModel, view: BaseTextComponentView) {
        return new TextComponent(viewModel, view);
    }
}
