﻿import { HtmlComponent } from "./HtmlComponent";
import { ContextualClass } from "../ContextualClass";
import { InputViewModel } from "./InputViewModel";
import { DefaultEvent } from "../Events";

export class Input extends HtmlComponent {
    private readonly _changed = new DefaultEvent<string>(this);
    readonly changed = this._changed.handler();

    protected readonly vm: InputViewModel;

    private border = ContextualClass.default;

    constructor(vm: InputViewModel = new InputViewModel()) {
        super(vm);
        vm.type('text');
        vm.value.subscribe(this.onValueChanged.bind(this));
    }

    private onValueChanged(value: string) {
        this._changed.invoke(value);
    }

    enable() { this.vm.isEnabled(true); }

    disable() { this.vm.isEnabled(false); }

    clearAutocomplete() { this.setAutocomplete(null); }

    setAutocompleteOff() { this.setAutocomplete('off'); }

    setAutocompleteNewPassword() { this.setAutocomplete('new-password'); }

    private setAutocomplete(autocomplete: string) {
        this.vm.autocomplete(autocomplete);
    }

    getValue() { return this.vm.value(); }

    setValue(value: string) {
        this.vm.value(value);
    }

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

    setType(type: 'text' | 'hidden' | 'password' | 'date' | 'number' | 'time') {
        this.vm.type(type);
    }

    hasFocus() { return this.vm.hasFocus(); }

    setFocus() { this.vm.hasFocus(true); }

    blur() { this.vm.hasFocus(false); }

}