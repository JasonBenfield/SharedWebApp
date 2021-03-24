import { BlockViewModel } from "../Html/BlockViewModel";
import { Select } from "../Html/Select";
import { SelectOption } from "../Html/SelectOption";
import { ConstraintCollection } from "./ConstraintCollection";
import { ErrorList } from "./ErrorList";
import { SimpleFieldFormGroup } from "./SimpleFieldFormGroup";

export class DropDownFormGroup<TValue> extends SimpleFieldFormGroup<TValue> {
    constructor(prefix: string, name: string, vm: BlockViewModel = new BlockViewModel()) {
        super(prefix, name, vm);
    }

    readonly constraints = new ConstraintCollection();

    protected validateConstraints(fieldErrors: ErrorList) {
        this.constraints.validate(fieldErrors, this);
    }

    readonly select = this.inputGroup.insertContent(0, new Select<TValue>())
        .configure(select => {
            select.addCssName('form-control');
        });

    readonly valueChanged = this.select.changed;

    getValue() {
        return this.select.getValue();
    }

    setValue(value: TValue) {
        this.select.setValue(value);
    }

    setItems(...items: SelectOption<TValue>[]) {
        this.select.setItems(items);
    }

    setItemCaption(itemCaption: string) {
        this.select.setItemCaption(itemCaption);
    }
}