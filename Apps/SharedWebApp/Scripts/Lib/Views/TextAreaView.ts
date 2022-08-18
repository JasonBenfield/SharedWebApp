import { BasicComponentView } from "./BasicComponentView";
import { BasicTextComponentView } from "./BasicTextComponentView";
import { ITextAreaAttributes } from "./Types";

export class TextAreaView extends BasicTextComponentView {
    protected readonly textAreaElement: HTMLTextAreaElement;

    constructor(container: BasicComponentView) {
        super(container, 'textarea');
        this.textAreaElement = this.elementView.element as HTMLTextAreaElement;
    }

    styleAsFormControl() {
        this.addCssName('form-control');
    }

    protected setAttr: (config: (attr: ITextAreaAttributes) => void) => void;

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

    hasFocus() { return document.activeElement === this.textAreaElement; }

    setFocus() {
        this.textAreaElement.focus();
    }

    blur() { this.textAreaElement.blur(); }

    onFocus() { return this.on('focus'); }

    onBlur() { return this.on('blur'); }

    onInput() { return this.on('input change'); }
}