import { DropDownFieldItem } from "./DropDownFieldItem";
import { DropDownFieldViewModel } from "./DropDownFieldViewModel";
import { FieldViewValue } from "./FieldViewValue";
import { SimpleField } from "./SimpleField";

export class DropDownField<T> extends SimpleField {
    private readonly dropDownVM: DropDownFieldViewModel;

    constructor(prefix: string, name: string, vm: DropDownFieldViewModel) {
        super(prefix, name, vm, new FieldViewValue());
        this.dropDownVM = vm;
    }

    setItems(...items: DropDownFieldItem<T>[]) {
        this.dropDownVM.value.items(items);
    }

    setItemCaption(itemCaption: string) {
        this.dropDownVM.value.itemsCaption(itemCaption);
    }

    setValue(value: T) { super.setValue(value); }

    getValue() { return <T>super.getValue(); }
}
