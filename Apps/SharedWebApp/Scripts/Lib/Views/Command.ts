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
    private isIconRight: boolean;
    private text: string;

    constructor(container: BasicComponentView) {
        super(container);
        this.icon = this.addView(FaIconView);
        this.textSpan = this.addView(TextSpanView);
        this.setContext(ContextualClass.default);
    }

    positionIconRight() {
        this.icon.pullRight();
        this.isIconRight = true;
        this.updateMargin();
    }

    setText(text: string) {
        this.textSpan.setText(text);
        this.text = text;
        this.updateMargin();
    }

    private updateMargin() {
        if (this.isIconRight) {
            this.icon.setMargin(MarginCss.top(1));
            if (this.text) {
                this.textSpan.setMargin(MarginCss.end(1));
            }
            else {
                this.textSpan.setMargin(MarginCss.xs(0));
            }
        }
        else {
            this.icon.setMargin(MarginCss.xs(0));
            if (this.text) {
                this.textSpan.setMargin(MarginCss.start(1));
            }
            else {
                this.textSpan.setMargin(MarginCss.xs(0));
            }
        }
    }
}

export class LinkCommandView extends LinkView implements ICommandView {
    readonly icon: FaIconView;
    private readonly textSpan: TextSpanView;
    private isIconRight: boolean;
    private text: string;

    constructor(container: BasicComponentView) {
        super(container);
        this.icon = this.addView(FaIconView);
        this.textSpan = this.addView(TextSpanView);
        this.addCssName('btn');
        this.setContext(ContextualClass.default);
    }

    positionIconRight() {
        this.icon.pullRight();
        this.isIconRight = true;
        this.updateMargin();
    }

    setText(text: string) {
        this.textSpan.setText(text);
        this.text = text;
        this.updateMargin();
    }

    private updateMargin() {
        if (this.isIconRight) {
            this.icon.setMargin(MarginCss.top(1));
            if (this.text) {
                this.textSpan.setMargin(MarginCss.end(1));
            }
            else {
                this.textSpan.setMargin(MarginCss.xs(0));
            }
        }
        else {
            this.icon.setMargin(MarginCss.xs(0));
            if (this.text) {
                this.textSpan.setMargin(MarginCss.start(1));
            }
            else {
                this.textSpan.setMargin(MarginCss.xs(0));
            }
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
        this.setCss('link-context', this.getContextCss(context, false));
    }

    useOutlineStyle(context: ContextualClass) {
        this.setCss('link-context', this.getContextCss(context, true));
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }
}