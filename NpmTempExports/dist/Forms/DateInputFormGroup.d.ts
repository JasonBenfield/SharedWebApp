import { DateConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { InputFormGroup } from "./InputFormGroup";
import { InputFormGroupView } from "./InputFormGroupView";
export declare class DateInputFormGroup extends InputFormGroup<Date> {
    readonly constraints: DateConstraintCollection;
    constructor(prefix: string, name: string, view: InputFormGroupView);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
