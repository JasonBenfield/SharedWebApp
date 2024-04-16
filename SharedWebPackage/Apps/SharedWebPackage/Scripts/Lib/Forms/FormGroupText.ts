﻿import { TextComponent } from "../Components/TextComponent";
import { FormGroupTextView } from "../Views/FormGroup";
import { FormGroup } from "./FormGroup";

export class FormGroupText extends FormGroup {
    private readonly textValue: TextComponent;

    constructor(view: FormGroupTextView) {
        super(view);
        this.textValue = this.addComponent(new TextComponent(view.valueTextView));
        this.textValue.syncTitleWithText();
    }

    getValue() { return this.textValue.getText(); }

    setValue(value: string) {
        this.textValue.setText(value);
    }

    setTitle(title: string) { this.textValue.setTitle(title); }
}