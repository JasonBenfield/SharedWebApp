import { FormGroup } from "./FormGroup";
import { TextValueFormGroupView } from "./TextValueFormGroupView";
export declare class TextValueFormGroup extends FormGroup {
    private value;
    private readonly valueText;
    constructor(view: TextValueFormGroupView);
    getValue(): string;
    setValue(value: string): void;
    syncValueTitleWithText(format?: (text: string) => string): void;
}
