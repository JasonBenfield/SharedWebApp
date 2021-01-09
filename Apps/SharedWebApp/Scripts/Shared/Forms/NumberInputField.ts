import { NumberConstraintCollection } from "./ConstraintCollection";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { SimpleField } from "./SimpleField";
import { TextToNumberViewValue } from "./TextToNumberViewValue";

export class NumberInputField extends SimpleField {
    static hidden(prefix: string, name: string, vm: InputFieldViewModel, viewValue = new TextToNumberViewValue()) {
        let field = new NumberInputField(prefix, name, vm, viewValue);
        vm.value.type('hidden');
        return field;
    };

    constructor(prefix: string, name: string, vm: InputFieldViewModel, viewValue = null) {
        super(prefix, name, vm, viewValue || new TextToNumberViewValue());
        this.constraints = new NumberConstraintCollection();
        this.inputVM = vm;
        this.inputVM.value.type('text');
    }

    private readonly inputVM: InputFieldViewModel;

    readonly constraints: NumberConstraintCollection;

    setValue(value: number) { super.setValue(value); }

    getValue() { return <number>super.getValue(); }

    protect() {
        this.inputVM.value.type('password');
    }

}
