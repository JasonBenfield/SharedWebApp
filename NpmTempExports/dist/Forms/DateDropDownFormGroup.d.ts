import { DateConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroup } from "./DropDownFormGroup";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
export declare class DateDropDownFormGroup extends DropDownFormGroup<Date> {
    readonly constraints: DateConstraintCollection;
    constructor(prefix: string, name: string, view: DropDownFormGroupView<Date>);
    protected validateConstraints(fieldErrors: ErrorList): void;
}
