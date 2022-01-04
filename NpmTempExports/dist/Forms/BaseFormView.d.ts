import { ModalErrorComponentView } from "../Error/ModalErrorComponentView";
import { FormGroupView } from "../Html/FormGroupView";
import { FormView } from "../Html/FormView";
import { FormViewModel } from "../Html/FormViewModel";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
export declare class BaseFormView extends FormView {
    private layout;
    private readonly formGroups;
    readonly modalError: ModalErrorComponentView;
    constructor(vm?: FormViewModel);
    useLayout(layout: ComplexFieldLayout): void;
    executeLayout(): void;
    forEachFormGroup(action: (field: FormGroupView) => void): void;
    addHiddenFormGroup(): import("./InputFormGroupView").InputFormGroupView;
    addInputFormGroup(): import("./InputFormGroupView").InputFormGroupView;
    addDropDownFormGroup<TValue>(): import("./DropDownFormGroupView").DropDownFormGroupView<TValue>;
    addFormGroup<TFormGroupView extends FormGroupView>(formGroup: TFormGroupView): TFormGroupView;
}
