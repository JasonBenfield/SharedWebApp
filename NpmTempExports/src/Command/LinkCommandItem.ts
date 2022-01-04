import { ButtonViewModel } from "../Html/ButtonViewModel";
import { Button } from "../Html/Button";
import { ContextualClass } from "../ContextualClass";
import { FaIcon } from "../FaIcon";
import { MarginCss } from "../MarginCss";
import { TextSpanView } from "../Html/TextSpanView";
import { ICommandItem } from "./CommandItem";
import { LinkView } from "../Html/LinkView";
import { LinkViewModel } from "../Html/LinkViewModel";

export class LinkCommandItem extends LinkView implements ICommandItem {
    readonly executeRequested = this.clicked;
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