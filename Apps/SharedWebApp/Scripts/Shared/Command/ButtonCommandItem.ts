import { ButtonViewModel } from "../Html/ButtonViewModel";
import { Button } from "../Html/Button";
import { ContextualClass } from "../ContextualClass";
import { FaIcon } from "../FaIcon";
import { MarginCss } from "../MarginCss";
import { TextSpanView } from "../Html/TextSpanView";
import { ICommandItem } from "./CommandItem";

export class ButtonCommandItem extends Button implements ICommandItem {
    static offscreenSubmit(vm: ButtonViewModel) {
        let item = new ButtonCommandItem(vm);
        item.makeOffscreenSubmit();
        return item;
    }

    readonly executeRequested = this.clicked;
    readonly icon: FaIcon;
    private readonly textSpan: TextSpanView;
    private active = '';
    protected readonly vm: ButtonViewModel;

    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        this.icon = new FaIcon().addToContainer(this);
        this.icon.setMargin(MarginCss.end(1));
        this.textSpan = new TextSpanView().addToContainer(this);
        vm.type('button');
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

    changeTypeToSubmit() {
        this.vm.type('submit');
    }

    makeOffscreenSubmit() {
        this.addCssName('offscreen');
        this.changeTypeToSubmit();
    }
}