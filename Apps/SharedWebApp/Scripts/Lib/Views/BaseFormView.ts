import { CssLengthUnit } from "../CssLengthUnit";
import { DelayedAction } from "../DelayedAction";
import { BasicComponentView } from "./BasicComponentView";
import { FormGroupGridView, FormGroupView, SimpleFieldFormGroupInputView, SimpleFieldFormGroupSelectView } from "./FormGroup";
import { FormView } from "./FormView";
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

    handleSubmit(action: (el: HTMLElement, evt: JQueryEventObject) => void) {
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

    addHiddenInputFormGroup() {
        const formGroup = this.addInputFormGroup();
        this.hideFormGroup(formGroup);
        return formGroup;
    }

    private hideFormGroup(formGroup: SimpleFieldFormGroupInputView) {
        formGroup.input.setType('hidden');
        formGroup.hide();
    }

    addInputFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupInputView);
    }

    addDropDownFormGroup() {
        return this.addFormGroup(SimpleFieldFormGroupSelectView);
    }

    addFormGroup<TView extends FormGroupView>(ctor: ViewConstructor<TView>) {
        return this.grid.addFormGroup<TView>(ctor);
    }
}
