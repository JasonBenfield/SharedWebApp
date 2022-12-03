import { ContextualClass } from "../ContextualClass";
import { MarginCss } from "../MarginCss";
import { BasicComponentView } from "./BasicComponentView";
import { ButtonView } from "./ButtonView";
import { FaIconView } from "./FaIconView";
import { LinkView } from "./LinkView";
import { TextSpanView } from "./TextSpanView";

export interface ICommandView {
    readonly icon: FaIconView;
    positionIconRight();
    setText(text: string);
    setTitle(text: string);
    setContext(contextualClass: ContextualClass);
    setActive();
    setInactive();
    show();
    hide();
    enable();
    disable();
    handleClick(action: () => void);
}

export class ButtonCommandView extends ButtonView implements ICommandView {
    readonly icon: FaIconView;
    private readonly textSpan: TextSpanView;

    constructor(container: BasicComponentView) {
        super(container);
        this.icon = this.addView(FaIconView);
        this.textSpan = this.addView(TextSpanView);
        this.setContext(ContextualClass.default);
    }

    positionIconRight() {
        this.icon.pullRight();
        this.icon.setMargin(MarginCss.xs({ start: 1, top: 1 }));
    }

    setText(text: string) {
        this.textSpan.setText(text);
        if (text) {
            this.icon.setMargin(MarginCss.end(1));
        }
        else { 
            this.icon.setMargin(MarginCss.xs(0));
        }
    }
}

export class LinkCommandView extends LinkView implements ICommandView {
    readonly icon: FaIconView;
    private readonly textSpan: TextSpanView;
    private context: ContextualClass;
    private isOutline = false;

    constructor(container: BasicComponentView) {
        super(container);
        this.icon = this.addView(FaIconView);
        this.textSpan = this.addView(TextSpanView);
        this.addCssName('btn');
        this.setContext(ContextualClass.default);
    }

    positionIconRight() {
        this.icon.pullRight();
        this.icon.setMargin(MarginCss.xs({ start: 1, top: 1 }));
    }

    setText(text: string) {
        this.textSpan.setText(text);
        if (text) {
            this.icon.setMargin(MarginCss.end(1));
        }
        else {
            this.icon.setMargin(MarginCss.xs(0));
        }
    }

    enable() {
        this.updateDisabled('');
    }

    disable() {
        this.updateDisabled('disabled');
    }

    private updateDisabled(disabled: string) {
        this.setCss('link-disabled', disabled);
    }

    setActive() {
        this.updateActiveCss('active');
    }

    setInactive() {
        this.updateActiveCss('');
    }

    private updateActiveCss(active: string) {
        this.setCss('link-active', active);
    }

    setContext(context: ContextualClass) {
        const contextCss = this.getContextCss(context, this.isOutline);
        this.setCss('link-context', contextCss);
        this.context = context;
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }

    useOutlineStyle() {
        let contextCss = this.getContextCss(this.context, true);
        this.setCss('link-context', contextCss);
        this.isOutline = true;
    }
}