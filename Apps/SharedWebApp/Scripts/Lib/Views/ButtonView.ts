import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "./BasicComponentView";
import { BasicContainerView } from "./BasicContainerView";
import { IButtonAttributes } from "./Types";

export class ButtonView extends BasicContainerView {
    private context: ContextualClass;
    private isOutline = false;

    constructor(container: BasicComponentView) {
        super(container, 'button');
        this.setAttr(attr => attr.type = 'button');
        this.addCssName('btn');
    }

    protected setAttr: (config: (attr: IButtonAttributes) => void) => void;

    handleClick(action: () => void) {
        this.on('click').execute(action).subscribe();
    }

    changeTypeToSubmit() {
        this.setAttr(attr => attr.type = 'submit');
    }

    enable() { this.setAttr(a => a.disabled = false); }

    disable() { this.setAttr(a => a.disabled = true); }

    setContext(context: ContextualClass) {
        this.setCss('button-context', this.getContextCss(context, this.isOutline));
        this.context = context;
    }

    useOutlineStyle() {
        this.setCss('button-context', this.getContextCss(this.context, true));
        this.isOutline = true;
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }

    makeOffscreenSubmit() {
        this.addCssName('offscreen');
        this.changeTypeToSubmit();
    }
}