import { InputFormGroupView } from "./InputFormGroupView";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
import { TypedFieldViewValue } from "./TypedFieldViewValue";
export declare abstract class InputFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    private readonly viewValue;
    protected readonly view: InputFormGroupView;
    private readonly _valueChanged;
    readonly valueChanged: import("../Events").DefaultEventHandler<TValue>;
    constructor(prefix: string, name: string, view: InputFormGroupView, viewValue: TypedFieldViewValue<string, TValue>);
    private onInputValueChanged;
    private debouncedOnInputValueChanged;
    getValue(): TValue;
    setValue(value: TValue): void;
    setMaxLength(maxLength: number): void;
    protect(): void;
    setFocus(): void;
    blur(): void;
}
