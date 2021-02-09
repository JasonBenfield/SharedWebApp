import { ButtonViewModel } from "../Html/ButtonViewModel";
import { Button } from "../Html/Button";
import { ContextualClass } from "../ContextualClass";
import { FaIcon } from "../FaIcon";
import { MarginCss } from "../MarginCss";
import { TextSpan } from "../Html/TextSpan";
import { ICommandItem } from "./CommandItem";

export class ButtonCommandItem extends Button implements ICommandItem {
    static offscreenSubmit(vm: ButtonViewModel) {
        let item = new ButtonCommandItem(vm);
        item.makeOffscreenSubmit();
        return item;
    }

    constructor(vm: ButtonViewModel = new ButtonViewModel()) {
        super(vm);
        vm.type('button');
        this.addCssName('btn');
        this.setContext(ContextualClass.default);
    }

    readonly executeRequested = this.clicked;
    readonly icon = new FaIcon().addToContainer(this)
        .configure(icon => {
            icon.setMargin(MarginCss.end(1));
        });
    private readonly textSpan = new TextSpan().addToContainer(this);

    positionIconRight() {
        this.icon.pullRight();
        this.icon.setMargin(MarginCss.start(1));
    }

    setText(text: string) {
        this.textSpan.setText(text);
    }

    private active = '';

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

    protected readonly vm: ButtonViewModel;

    changeTypeToSubmit() {
        this.vm.type('submit');
    }

    makeOffscreenSubmit() {
        this.addCssName('offscreen');
        this.changeTypeToSubmit();
    }

}