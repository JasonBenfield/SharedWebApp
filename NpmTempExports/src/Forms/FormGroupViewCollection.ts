import { FormGroupView } from "../Html/FormGroupView";
import { ComplexFieldFormGroupView } from "./ComplexFieldFormGroupView";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { InputFormGroupView } from "./InputFormGroupView";

export class FormGroupViewCollection {
    readonly values: FormGroupView[] = [];

    formGroups() {
        return this.values;
    }

    addHiddenInputFormGroup() {
        let formGroup = this.addInputFormGroup();
        this.hideFormGroup(formGroup);
        return formGroup;
    }

    private hideFormGroup(formGroup: InputFormGroupView) {
        formGroup.input.setType('hidden');
        formGroup.hide();
    }

    addInputFormGroup() {
        return this.addFormGroup(new InputFormGroupView());
    }

    addDropDownFormGroup<TValue>() {
        return this.addFormGroup(new DropDownFormGroupView<TValue>());
    }

    addFormGroup<TView extends FormGroupView>(formGroup: TView) {
        this.values.push(formGroup);
        return formGroup;
    }

    executeLayout() {
        this.forEach(fg => {
            if (fg instanceof ComplexFieldFormGroupView) {
                fg.executeLayout();
            }
        });
    }

    forEach(action: (field: FormGroupView) => void) {
        for (let formGroup of this.formGroups()) {
            action(formGroup);
        }
    }
}