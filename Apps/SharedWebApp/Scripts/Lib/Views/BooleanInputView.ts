import { ContextualClass } from "../ContextualClass";
import { BasicComponentView } from "./BasicComponentView";
import { IInputAttributes } from "./Types";

export class BooleanInputView extends BasicComponentView {
    protected readonly inputElement: HTMLInputElement;

    constructor(container: BasicComponentView) {
        super(container, 'input');
        this.inputElement = this.elementView.element as HTMLInputElement;
        this.setType('checkbox');
    }

    protected setAttr: (config: (attr: IInputAttributes) => void) => void;

    enable() { this.setAttr(a => a.disabled = false); }

    disable() { this.setAttr(a => a.disabled = true); }

    getValue() { return this.inputElement.checked; }

    setValue(value: boolean) {
        this.inputElement.checked = value;
    }

    setBorder(border: ContextualClass) {
        const borderCss = this.getBorderCss(border);
        this.setCss('border', borderCss);
    }

    private getBorderCss(border: ContextualClass) {
        return border === ContextualClass.default ? '' : border.append('border');
    }

    setType(type: 'checkbox' | 'radio') {
        this.setAttr(attr => attr.type = type);
    }

    hasFocus() { return document.activeElement === this.inputElement; }

    setFocus() { this.inputElement.focus(); }

    blur() { this.inputElement.blur(); }

    onFocus() { return this.on('focus'); }

    onBlur() { return this.on('blur'); }

    onChange() { return this.on('change'); }

}