import { ContextualClass } from "../ContextualClass";
import { SimpleEvent } from "../Events";
import { FaIcon } from "../FaIcon";
import { LinkView } from "../Html/LinkView";
import { LinkViewModel } from "../Html/LinkViewModel";
import { TextSpanView } from "../Html/TextSpanView";
import { MarginCss } from "../MarginCss";
import { ICommandItem } from "./CommandItem";

export class LinkCommandItem extends LinkView implements ICommandItem {
    private readonly _executeRequested = new SimpleEvent(this);
    readonly executeRequested = this._executeRequested.handler();

    readonly icon: FaIcon;
    private readonly textSpan: TextSpanView;
    private active = '';
    protected readonly vm: LinkViewModel;
    private context: ContextualClass;
    private isOutline = false;

    constructor(vm: LinkViewModel = new LinkViewModel()) {
        super(vm);
        this.icon = new FaIcon().addToContainer(this);
        this.icon.setMargin(MarginCss.end(1));
        this.textSpan = new TextSpanView().addToContainer(this);
        this.addCssName('btn');
        this.setContext(ContextualClass.default);
        this.events.onClick(() => this._executeRequested.invoke());
    }

    positionIconRight() {
        this.icon.pullRight();
        this.icon.setMargin(MarginCss.start(1));
    }

    setText(text: string) {
        this.textSpan.setText(text);
    }

    setActive() {
        this.updateActiveCss('active');
    }

    setInactive() {
        this.updateActiveCss('');
    }

    private updateActiveCss(active: string) {
        this.replaceCssName(this.active, active);
        this.active = active;
    }

    setContext(context: ContextualClass) {
        let contextCss = this.getContextCss(context, this.isOutline);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.context = context;
    }

    private getContextCss(context: ContextualClass, isOutline: boolean) {
        return context ? context.append(isOutline ? 'btn-outline' : 'btn') : '';
    }

    useOutlineStyle() {
        let contextCss = this.getContextCss(this.context, true);
        this.replaceCssName(this.getContextCss(this.context, this.isOutline), contextCss);
        this.isOutline = true;
    }
}