import { BasicComponentView } from "./BasicComponentView";
import { BooleanInputView } from "./BooleanInputView";
import { ButtonView } from "./ButtonView";
import { DropdownComponentView } from "./Dropdown";
import { InputView } from "./InputView";
import { LabelView } from "./LabelView";
import { SelectView } from "./SelectView";
import { SpanView } from "./SpanView";
import { TextLabelView } from "./TextLabelView";
import { TextSpanView } from "./TextSpanView";
import { ViewConstructor } from "./Types";

export class InputGroupView extends BasicComponentView {
    constructor(container: BasicComponentView) {
        super(container, 'div');
        this.addCssName('input-group');
    }

    prependText<T extends (SpanView | TextSpanView | LabelView | TextLabelView)>(ctor: ViewConstructor<T>) {
        return this.insertText(0, ctor);
    }

    appendText<T extends (SpanView | TextSpanView | LabelView | TextLabelView)>(ctor: ViewConstructor<T>) {
        return this.insertText(this.viewCount, ctor);
    }

    private insertText<T extends (SpanView | TextSpanView | LabelView | TextLabelView)>(index: number, ctor: ViewConstructor<T>) {
        const view = this.insertView(index, ctor);
        view.addCssName('input-group-text');
        return view as T;
    }

    prependFormControl<T extends InputView | SelectView | BooleanInputView>(ctor: ViewConstructor<T>) {
        return this.insertFormControl(0, ctor);
    }

    appendFormControl<T extends InputView | SelectView | BooleanInputView>(ctor: ViewConstructor<T>) {
        return this.insertFormControl(this.viewCount, ctor);
    }

    private insertFormControl<T extends InputView | SelectView | BooleanInputView>(index: number, ctor: ViewConstructor<T>) {
        const control = this.insertView(index, ctor);
        control.addCssName('form-control');
        return control as T;
    }

    addButton<T extends ButtonView>(ctor?: ViewConstructor<T>) {
        return this.addView(ctor || ButtonView) as T;
    }

    addDropdown() {
        return this.addView(DropdownComponentView);
    }
}