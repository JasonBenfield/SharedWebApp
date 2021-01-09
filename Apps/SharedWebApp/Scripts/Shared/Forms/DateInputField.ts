import { DateConstraintCollection } from "./ConstraintCollection";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { SimpleField } from "./SimpleField";
import { TextToDateViewValue } from "./TextToDateViewValue";

export class DateInputField extends SimpleField {

    static hidden(prefix: string, name: string, vm: InputFieldViewModel, viewValue = new TextToDateViewValue()) {
        let field = new DateInputField(prefix, name, vm, viewValue);
        vm.value.type('hidden');
        return field;
    };

    constructor(prefix: string, name: string, vm: InputFieldViewModel, viewValue = null) {
        super(prefix, name, vm, viewValue || new TextToDateViewValue());
        this.constraints = new DateConstraintCollection();
        vm.value.type('date');
    }

    readonly constraints: DateConstraintCollection;

    setValue(value: Date) { super.setValue(value); }

    getValue() { return <Date>super.getValue(); }
}