﻿import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { IButtonAttributes } from "./Types";

export class TextButtonView extends BasicTextComponentView {
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
        this.setCss('button-context', this.getContextCss(context, false));
    }

    useOutlineStyle(context: ContextualClass) {
        this.setCss('button-context', this.getContextCss(context, true));
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }

    makeOffscreenSubmit() {
        this.addCssName('offscreen');
        this.changeTypeToSubmit();
    }

    setActive() {
        this.updateActiveCss('active');
    }

    setInactive() {
        this.updateActiveCss('');
    }

    private updateActiveCss(active: string) {
        this.setCss('active', active);
    }
}