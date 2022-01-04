import { SelectOption } from "../Html/SelectOption";
import { ConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";
export declare class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: DropDownFormGroupView<TValue>;
    readonly constraints: ConstraintCollection;
    readonly valueChanged: import("../Events").DefaultEventHandler<TValue>;
    constructor(prefix: string, name: string, view: DropDownFormGroupView<TValue>);
    protected validateConstraints(fieldErrors: ErrorList): void;
    getValue(): TValue;
    setValue(value: TValue): void;
    setItems(...items: SelectOption<TValue>[]): void;
    setItemCaption(itemCaption: string): void;
}
