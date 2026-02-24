import { Component, IComponentChangeHandler } from "./Component";
import { ComponentView, IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, IComponentFactory, ObservableChanges } from "./ComponentViewModel";
import { IStyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor, ITitleView, ITitleViewModel } from "./Types";

export interface ITextViewModel {
    get text(): string;
    set text(text: string);
}

export type ITextComponentView = IComponentView & ITextView & ITitleView;

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

export class TextComponentViewModel extends TextViewModelMixin(TitleViewModelMixin(ComponentViewModel)) implements ITextViewModel {
    constructor(initializer: ComponentViewModelInitializer<TextComponentViewModel> = {}) {
        super(initializer);
    }

    createComponent(view: ITextComponentView) {
        return new TextComponent(this, view);
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

        addToDom(parent: HTMLElement) {
            super.addToDom(parent);
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

export class TextComponentView extends TextViewMixin(TitleViewMixin(StyleableComponentViewMixin(ComponentView))) implements ITextView {
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

export class TextChangeHandler implements IComponentChangeHandler {
    constructor(private readonly view: ITextComponentView) {
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & ITextViewModel>) {
        if (changes.text) {
            this.view.setText(changes.text.value);
        }
    }
}

export class TitleChangeHandler implements IComponentChangeHandler {
    constructor(private readonly view: IComponentView & ITitleView) {
    }

    handleChanges(changes: ObservableChanges<ComponentViewModel & ITitleViewModel>) {
        if (changes.title) {
            this.view.setTitle(changes.title.value);
        }
    }
}

export class TextComponent extends Component {
    constructor(protected readonly viewModel: TextComponentViewModel, protected readonly view: ITextComponentView) {
        super(
            viewModel,
            view,
            new TitleChangeHandler(view),
            new TextChangeHandler(view)
        );
    }

    get text() { return this.viewModel.text; }

    set text(text: string) {
        this.viewModel.text = text;
    }

    get title() { return this.viewModel.title; }

    set title(title: string) {
        this.viewModel.title = title;
    }
}