import { BaseFormView } from "./BaseFormView";
import { ComplexFieldFormGroupView } from "./ComplexFieldFormGroupView";
export declare class ComplexFieldLayout {
    private readonly complexField;
    constructor(complexField: ComplexFieldFormGroupView | BaseFormView);
    execute(): void;
    protected executeLayout(complexField: ComplexFieldFormGroupView | BaseFormView): void;
}
