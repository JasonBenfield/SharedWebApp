import { ContextualClass } from "../ContextualClass";
import { TextCss } from "../TextCss";
import { BasicComponentView } from "./BasicComponentView";
import { BlockView } from "./BlockView";
import { ButtonCommandView, LinkCommandView } from "./Command";
import { ViewConstructor } from "./Types";

export class ButtonContainerView extends BlockView {
    constructor(container: BasicComponentView) {
        super(container);
        this.addCssName("d-grid");
        this.addCssName("gap-3");
        this.addCssName("col-12 col-sm-6");
    }

    addButtonCommand<T extends ButtonCommandView>(viewCtor?: ViewConstructor<T>) {
        if (!viewCtor) {
            viewCtor = ButtonCommandView as any;
        }
        const button = this.addView(viewCtor);
        button.icon.makeFixedWidth();
        button.setTextCss(new TextCss().start());
        button.useOutlineStyle(ContextualClass.primary);
        return button;
    }

    addLinkCommand<T extends LinkCommandView>(viewCtor?: ViewConstructor<T>) {
        if (!viewCtor) {
            viewCtor = LinkCommandView as any;
        }
        const button = this.addView(viewCtor);
        button.icon.makeFixedWidth();
        button.setTextCss(new TextCss().start());
        button.useOutlineStyle(ContextualClass.primary);
        return button;
    }
}