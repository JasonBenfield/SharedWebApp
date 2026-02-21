import { Component } from "./Component";
import { ILinkView, ITextComponentView } from "./Types";
import { ObservableChanges, ComponentViewModel } from "./ComponentViewModel";

export class TextLinkComponentViewModel extends ComponentViewModel {
    private _text = "";
    get text() { return this._text; }
    set text(text: string) { this._text = text; }

    private _href = "";
    get href() { return this._href; }
    set href(href: string) { this._href = href; }

    private _title = "";
    get title() { return this._title; }
    set title(title: string) { this._title = title; }
}

export type ITextLinkView = ILinkView & ITextComponentView;

export class TextLinkComponent extends Component {
    constructor(viewModel: TextLinkComponentViewModel, view: ITextLinkView) {
        super(viewModel, view);
    }

    declare protected readonly view: ITextLinkView;

    protected handleChanges(changes: ObservableChanges<TextLinkComponentViewModel>) {
        super.handleChanges(changes);
        if (changes.text) {
            this.view.setText(changes.text.value);
        }
        else if (changes.title) {
            this.view.setTitle(changes.title.value);
        }
        else if (changes.href) {
            this.view.setHref(changes.href.value);
        }
    }
}