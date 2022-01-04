import { FormGroupView } from "../Html/FormGroupView";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { InputFormGroupView } from "./InputFormGroupView";
export declare class FormGroupViewCollection {
    readonly values: FormGroupView[];
    formGroups(): FormGroupView[];
    addHiddenInputFormGroup(): InputFormGroupView;
    private hideFormGroup;
    addInputFormGroup(): InputFormGroupView;
    addDropDownFormGroup<TValue>(): DropDownFormGroupView<TValue>;
    addFormGroup<TView extends FormGroupView>(formGroup: TView): TView;
    executeLayout(): void;
    forEach(action: (field: FormGroupView) => void): void;
}
