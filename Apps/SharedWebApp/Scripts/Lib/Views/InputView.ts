import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "./BasicComponentView";
import { IInputAttributes } from "./Types";

export class InputView extends BasicComponentView {
    protected readonly inputElement: HTMLInputElement;

    constructor(container: BasicComponentView) {
        super(container, 'input');
        this.inputElement = this.elementView.element as HTMLInputElement;
        this.setType('text');
    }

    protected setAttr: (config: (attr: IInputAttributes) => void) => void;

    styleAsFormControl() {
        this.addCssName('form-control');
    }

    enable() { this.setAttr(a => a.disabled = false); }

    disable() { this.setAttr(a => a.disabled = true); }

    clearAutocomplete() { this.setAutocomplete(null); }

    setAutocompleteOff() { this.setAutocomplete('off'); }

    setAutocompleteNewPassword() { this.setAutocomplete('new-password'); }

    private setAutocomplete(autocomplete: string) {
        this.setAttr(attr => attr.autocomplete = autocomplete);
    }

    getValue() { return this.inputElement.value; }

    setValue(value: string) {
        this.inputElement.value = value;
    }

    setBorder(border: ContextualClass) {
        const borderCss = this.getBorderCss(border);
        this.setCss('border', borderCss);
    }

    private getBorderCss(border: ContextualClass) {
        return border === ContextualClass.default ? '' : border.append('border');
    }

    setMaxLength(maxLength: number) {
        this.setAttr(attr => attr.maxlength = maxLength.toString());
    }

    setReadOnly(readonly: boolean) {
        this.setAttr(attr => attr.readonly = readonly);
    }

    setPlaceholder(placeholder: string) {
        this.setAttr(attr => attr.placeholder = placeholder);
    }

    setType(type: 'text' | 'hidden' | 'password' | 'date' | 'number' | 'time') {
        this.setAttr(attr => attr.type = type);
    }

    setInputMode(inputmode: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url') {
        this.setAttr(attr => attr.inputmode = inputmode);
    }

    setPattern(pattern: string) {
        this.setAttr(attr => attr.pattern = pattern);
    }

    hasFocus() { return document.activeElement === this.inputElement; }

    setFocus() {
        this.inputElement.focus();
    }

    blur() { this.inputElement.blur(); }

    onFocus() { return this.on('focus'); }

    onBlur() { return this.on('blur'); }

    onInput() { return this.on('input change'); }

}