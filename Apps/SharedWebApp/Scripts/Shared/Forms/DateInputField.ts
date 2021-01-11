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
        this.inputVM = vm;
        this.inputVM.value.type('date');
    }

    private readonly inputVM: InputFieldViewModel;

    readonly constraints: DateConstraintCollection;

    setFocus() { this.inputVM.value.hasFocus(true); }

    blur() { this.inputVM.value.hasFocus(false); }

    setValue(value: Date) { super.setValue(value); }

    getValue() { return <Date>super.getValue(); }
}