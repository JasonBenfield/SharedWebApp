﻿import { CssLengthUnit } from "../CssLengthUnit";
import { DelayedAction } from "../DelayedAction";
import { BasicComponentView } from "./BasicComponentView";
import { FormGroupGridView, FormGroupView, SimpleFieldFormGroupDateTimeInputView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView } from "./FormGroup";
import { FormView } from "./FormView";
import { InputView } from "./InputView";
import { ModalErrorView } from "./ModalError";
import { ViewConstructor } from "./Types";

export class BaseFormView extends FormView {
    private readonly grid: FormGroupGridView;
    readonly modalError: ModalErrorView;

    constructor(container: BasicComponentView) {
        super(container);
        this.grid = this.addView(FormGroupGridView);
        this.grid.setTemplateColumns(CssLengthUnit.auto(), CssLengthUnit.flex(1));
        this.modalError = this.addView(ModalErrorView);
    }

    handleSubmit(action: (el: HTMLElement, evt: JQuery.Event) => void) {
        this.on('submit')
            .execute(async (el, evt) => {
                evt.preventDefault();
                if (document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur();
                }
                await DelayedAction.delay(300);
                action(el, evt);
            })
            .subscribe();
    }

    addHiddenInput() {
        const inputView = this.addView(InputView);
        inputView.setType('hidden');
        return inputView;
    }
    
    addInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupInputView);
    }

    addDateTimeInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupDateTimeInputView);
    }

    addDropDownFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupSelectView);
    }

    addFormGroup<TView extends FormGroupView>(ctor: ViewConstructor<TView>) {
        return this.grid.addFormGroup<TView>(ctor);
    }
}
