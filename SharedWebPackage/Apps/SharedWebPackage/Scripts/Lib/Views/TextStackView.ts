import { BasicComponentView } from "./BasicComponentView";
import { BlockWithTextView } from "./BlockWithTextView";
import { TextBlockView } from "./TextBlockView";
import { ITextComponentView, ViewConstructor } from "./Types";

type TextStackItemView = BasicComponentView & ITextComponentView;

export class TextStackView extends BasicComponentView {
    private defaultAddTextView: () => TextStackItemView = this.addTextBlock.bind(this);

    constructor(container: BasicComponentView) {
        super(container, 'div');
    }

    getViews: () => TextStackItemView[];

    setDefaultAddTextView(defaultAddTextView: () => TextStackItemView) {
        this.defaultAddTextView = defaultAddTextView || this.addTextBlock.bind(this);
    }

    addDefaultTextView() {
        return this.defaultAddTextView();
    }

    addTextBlock() {
        return this.addTextView(TextBlockView);
    }

    addBlockWithText() {
        return this.addTextView(BlockWithTextView);
    }

    addTextView<TView extends TextStackItemView>(ctor: ViewConstructor<TView>) {
        return this.addView(ctor);
    }

    scrollIntoView(arg?: boolean | ScrollIntoViewOptions) {
        this.elementView.scrollIntoView(arg);
    }
}