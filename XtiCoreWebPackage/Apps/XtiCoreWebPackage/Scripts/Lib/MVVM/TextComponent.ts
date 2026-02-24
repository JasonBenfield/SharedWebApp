import { Component, IComponentChangeHandler } from "./Component";
import { ComponentView, IComponentView } from "./ComponentView";
import { ComponentViewModel, ComponentViewModelInitializer, IComponentFactory, ObservableChanges } from "./ComponentViewModel";
import { StyleableComponentView } from "./StyleableComponentView";
import { ITitleView, ITitleViewModel } from "./Types";

export interface ITextViewModel {
    get text(): string;
    set text(text: string);
}

export type ITextComponentView = IComponentView & ITextView & ITitleView;

class TextComponentFactory implements IComponentFactory {
    create(viewModel: TextComponentViewModel, view: ITextComponentView) {
        return new TextComponent(viewModel, view);
    }
}

export class TextComponentViewModel extends ComponentViewModel implements ITextViewModel, ITitleViewModel {
    constructor(initializer: ComponentViewModelInitializer<TextComponentViewModel> = {}) {
        super(initializer);
        this.setComponentFactory(new TextComponentFactory());
    }

    private _text = "";
    get text() { return this._text; }
    set text(text: string) { this._text = text; }

    private _title = "";
    get title() { return this._title; }
    set title(title: string) { this._title = title; }

    declare createComponent: (view: ITextComponentView) => TextComponent;
}

type Constructor<T = {}> = new (...args: any[]) => T;

function TitleViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base {
        setTitle(title: string) {
            this.setAttributes({ "title": title });
        }
    };
}

export interface ITextView {
    setText(text: string): void;
}

export class TextComponentView extends StyleableComponentView implements ITextView {
    static block() {
        return new TextComponentView(() => document.createElement("div"));
    }

    static span() {
        return new TextComponentView(() => document.createElement("span"));
    }

    static label() {
        return new TextComponentView(() => document.createElement("label"));
    }

    static heading(size: 1 | 2 | 3 | 4 | 5 | 6) {
        return new TextComponentView(() => document.createElement(`h${size}`));
    }

    private _text = "";

    constructor(createElement: () => HTMLElement) {
        super(createElement);
    }

    declare setTitle: (title: string) => void;

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