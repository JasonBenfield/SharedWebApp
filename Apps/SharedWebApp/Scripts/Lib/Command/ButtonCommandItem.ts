import { ButtonViewModel } from "../Html/ButtonViewModel";
import { Button } from "../Html/ButtonView";
import { ContextualClass } from "../ContextualClass";
import { FaIcon } from "../FaIcon";
import { MarginCss } from "../MarginCss";
import { TextSpanView } from "../Html/TextSpanView";
import { ICommandItem } from "./CommandItem";
import { SimpleEvent } from "../Events";

export class ButtonCommandItem extends Button implements ICommandItem {
    static offscreenSubmit(vm: ButtonViewModel) {
        let item = new ButtonCommandItem(vm);
        item.makeOffscreenSubmit();
        return item;
    }

    private readonly _executeRequested = new SimpleEvent(this);
    readonly executeRequested = this._executeRequested.handler();

    readonly icon: FaIcon;
    private readonly textSpan: TextSpanView;
    private active = '';
    protected readonly vm: ButtonViewModel;

    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        this.icon = new FaIcon().addToContainer(this);
        this.icon.setMargin(MarginCss.end(1));
        this.textSpan = new TextSpanView().addToContainer(this);
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

    makeOffscreenSubmit() {
        this.addCssName('offscreen');
        this.changeTypeToSubmit();
    }
}