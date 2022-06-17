import { SelectOption } from "../Html/SelectOption";
import { ConstraintCollection } from "./ConstraintCollection";
import { DropDownFormGroupView } from "./DropDownFormGroupView";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    protected readonly view: DropDownFormGroupView<TValue>;
    readonly constraints = new ConstraintCollection();
    readonly valueChanged = this.view.select.changed;

    constructor(prefix: string, name: string, view: DropDownFormGroupView<TValue>) {
        super(prefix, name, view);
    }

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }

    getValue() {
        return this.view.select.getValue();
    }

    setValue(value: TValue) {
        this.view.select.setValue(value);
    }

    setItems(...items: SelectOption<TValue>[]) {
        this.view.select.setItems(items);
    }

    setItemCaption(itemCaption: string) {
        this.view.select.setItemCaption(itemCaption);
    }
}