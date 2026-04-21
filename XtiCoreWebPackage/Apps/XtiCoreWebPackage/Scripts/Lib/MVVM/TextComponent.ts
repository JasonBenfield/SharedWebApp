import { Component, ComponentChangeHandler } from "./Component";
import { ComponentView, ComponentViewLayout } from "./ComponentView";
import { ComponentViewModel, ObservableChanges } from "./ComponentViewModel";
import { BaseCompositeComponentView } from "./CompositeComponent";
import { StyleableComponentView, StyleableComponentViewMixin } from "./StyleableComponentView";
import { Constructor, HeadingSize, ITitleView, ITitleViewModel } from "./Types";

export interface ITextViewModel {
    get text(): string;
    set text(text: string);
}

export interface ISynchedTitleViewModel {
    get isTitleSynchedWithText(): boolean;
    set isTitleSynchedWithText(title: boolean);
}

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
}

export function TitleViewMixin<T extends Constructor<StyleableComponentView>>(Base: T) {
    return class extends Base implements ITitleView {
        setTitle(title: string) {
            return this.setAttributes({ "title": title });
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

    static paragraph() {
        return new TextComponentView("p");
    }

    static span() {
        return new TextComponentView("span");
    }

    static strong() {
        return new TextComponentView("strong");
    }

    static small() {
        return new TextComponentView("small");
    }

    static emphasis() {
        return new TextComponentView("em");
    }

    static preformat() {
        return new TextComponentView("pre");
    }

    static deleted() {
        return new TextComponentView("del");
    }

    static inserted() {
        return new TextComponentView("ins");
    }

    static strikethrough() {
        return new TextComponentView("s");
    }

    static superscript() {
        return new TextComponentView("sup");
    }

    static subscript() {
        return new TextComponentView("sub");
    }

    static inlineQuote() {
        return new TextComponentView("q");
    }

    static blockQuote() {
        return new TextComponentView("blockquote");
    }

    static heading(size: HeadingSize) {
        return new TextComponentView(`h${size}`);
    }

    static listItem() {
        return new TextComponentView("li");
    }

}

export class ContainerOfTextView<TLayout extends ComponentViewLayout<TLayout>> extends TitleViewMixin(BaseCompositeComponentView)<TLayout, BaseTextComponentView> implements ITextView {
    static block<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "div", layout, toPublicLayout
        ).asLayout();
    }

    static paragraph<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "p", layout, toPublicLayout
        ).asLayout();
    }

    static span<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "span", layout, toPublicLayout
        ).asLayout();
    }

    static small<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "sm", layout, toPublicLayout
        ).asLayout();
    }

    static emphasis<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "em", layout, toPublicLayout
        ).asLayout();
    }

    static preformat<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "pre", layout, toPublicLayout
        ).asLayout();
    }

    static strikethrough<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "s", layout, toPublicLayout
        ).asLayout();
    }

    static inlineQuote<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "q", layout, toPublicLayout
        ).asLayout();
    }

    static blockQuote<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "blockquote", layout, toPublicLayout
        ).asLayout();
    }

    static heading<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(size: HeadingSize, layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            `h${size}`, layout, toPublicLayout
        ).asLayout();
    }

    static listItem<TLayout extends ComponentViewLayout<TLayout>, TPublicLayout extends BaseTextComponentView>(layout: TLayout, toPublicLayout: (l: TLayout) => TPublicLayout) {
        return new ContainerOfTextView(
            "li", layout, toPublicLayout
        ).asLayout();
    }

    declare asLayout: () => ContainerOfTextView<TLayout> & TLayout;

    setText(text: string) {
        this.publicLayout.setText(text);
    }
}

export class TextChangeHandler extends ComponentChangeHandler<ComponentViewModel & ITextViewModel, ComponentView & ITextView> {
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

export class SynchedTitleChangeHandler extends ComponentChangeHandler<BaseTextComponentViewModel, BaseTextComponentView> {

    handleChanges(changes: ObservableChanges<BaseTextComponentViewModel>) {
        if (changes.text || changes.isTitleSynchedWithText) {
            if (this.viewModel.isTitleSynchedWithText) {
                const title = this.viewModel.text;
                this.updateView(v => v.setTitle(title));
            }
        }
    }
}

export interface ITitleComponent {
    get title(): string;
    set title(title: string);
}

export function TitleComponentMixin<T extends Constructor<Component>>(Base: T) {
    return class extends Base implements ITitleComponent {
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

export type BaseTextComponentView = ComponentView & ITitleView & ITextView;

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
