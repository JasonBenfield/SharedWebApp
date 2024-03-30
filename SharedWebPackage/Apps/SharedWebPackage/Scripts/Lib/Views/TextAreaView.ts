import { BasicComponentView } from "./BasicComponentView";
import { ITextAreaAttributes } from "./Types";

export class TextAreaView extends BasicComponentView {
    protected readonly textAreaElement: HTMLTextAreaElement;

    constructor(container: BasicComponentView) {
        super(container, 'textarea');
        this.textAreaElement = this.elementView.element as HTMLTextAreaElement;
    }

    styleAsFormControl() {
        this.addCssName('form-control');
    }

    protected setAttr: (config: (attr: ITextAreaAttributes) => void) => void;

    required() { this.setAttr(a => a.required = true); }

    notRequired() { this.setAttr(a => a.required = false); }

    setCustomValidity(errorMessage: string) {
        this.textAreaElement.setCustomValidity(errorMessage);
    }

    setRows(rows: number) {
        this.setAttr(attr => attr.rows = rows.toString());
    }

    setCols(cols: number) {
        this.setAttr(attr => attr.cols = cols.toString());
    }

    clearAutocomplete() { this.setAutocomplete(null); }

    setAutocompleteOff() { this.setAutocomplete('off'); }

    setAutocompleteNewPassword() { this.setAutocomplete('new-password'); }

    private setAutocomplete(autocomplete: string) {
        this.setAttr(attr => attr.autocomplete = autocomplete);
    }

    enable() { this.setAttr(a => a.disabled = false); }

    disable() { this.setAttr(a => a.disabled = true); }

    setMaxLength(maxLength: number) {
        this.setAttr(attr => attr.maxlength = maxLength.toString());
    }

    setReadOnly(readonly: boolean) {
        this.setAttr(attr => attr.readonly = readonly);
    }

    setPlaceholder(placeholder: string) {
        this.setAttr(attr => attr.placeholder = placeholder);
    }

    getValue() { return this.textAreaElement.value; }

    setValue(value: string) {
        this.textAreaElement.value = value;
    }

    hasFocus() { return document.activeElement === this.textAreaElement; }

    setFocus() {
        this.textAreaElement.focus();
    }

    blur() { this.textAreaElement.blur(); }

    onFocus() { return this.on('focus'); }

    onBlur() { return this.on('blur'); }

    onInput() { return this.on('input change'); }
}