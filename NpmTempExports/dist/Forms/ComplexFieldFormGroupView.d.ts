import { BlockViewModel } from "../Html/BlockViewModel";
import { FormGroupView } from "../Html/FormGroupView";
import { ComplexFieldLayout } from "./ComplexFieldLayout";
import { FormGroupViewCollection } from "./FormGroupViewCollection";
export declare class ComplexFieldFormGroupView extends FormGroupView {
    private layout;
    readonly formGroups: FormGroupViewCollection;
    constructor(vm?: BlockViewModel);
    useLayout(createLayout: (fg: this) => ComplexFieldLayout): void;
    executeLayout(): void;
    forEachFormGroup(action: (field: FormGroupView) => void): void;
    addHiddenFormGroup(): import("./InputFormGroupView").InputFormGroupView;
    addInputFormGroup(): import("./InputFormGroupView").InputFormGroupView;
    addDropDownFormGroup(): import("./DropDownFormGroupView").DropDownFormGroupView<unknown>;
    addFormGroup<TFormGroupView extends FormGroupView>(formGroup: TFormGroupView): TFormGroupView;
}
