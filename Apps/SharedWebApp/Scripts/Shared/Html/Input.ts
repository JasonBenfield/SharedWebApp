import { HtmlComponent } from "./HtmlComponent";
import { ContextualClass } from "../ContextualClass";
import { InputViewModel } from "./InputViewModel";
import { DefaultEvent } from "../Events";

export class Input extends HtmlComponent {
    constructor(vm: InputViewModel = new InputViewModel()) {
        super(vm);
        vm.type('text');
        vm.value.subscribe(this.onValueChanged.bind(this));
    }

    private readonly _changed = new DefaultEvent<string>(this);
    readonly changed = this._changed.handler();

    private onValueChanged(value: string) {
        this._changed.invoke(value);   
    }

    protected readonly vm: InputViewModel;

    enable() { this.vm.isEnabled(true); }

    disable() { this.vm.isEnabled(false); }

    private value: string;

    getValue() {
        return this.value;
    }

    setValue(value: string) {
        this.value = value;
        this.vm.value(value);
    }

    private border = ContextualClass.default;

    setBorder(border: ContextualClass) {
        let borderCss = this.getBorderCss(border);
        this.replaceCssName(this.getBorderCss(this.border), borderCss);
        this.border = border;
    }

    private getBorderCss(border: ContextualClass) {
        return border === ContextualClass.default ? '' : border.append('border');
    }

    setMaxLength(maxLength: number) {
        this.vm.maxLength(maxLength);
    }

    setType(type: 'text' | 'hidden' | 'password' | 'date' | 'number') {
        this.vm.type(type);
    }

    setFocus() { this.vm.hasFocus(true); }

    blur() { this.vm.hasFocus(false); }

}