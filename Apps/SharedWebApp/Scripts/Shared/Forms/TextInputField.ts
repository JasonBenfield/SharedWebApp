import { TextConstraintCollection } from "./ConstraintCollection";
import { FieldViewValue } from "./FieldViewValue";
import { InputFieldViewModel } from "./InputFieldViewModel";
import { SimpleField } from "./SimpleField";

export class TextInputField extends SimpleField {
    static hidden(prefix: string, name: string, vm: InputFieldViewModel, viewValue = new FieldViewValue()) {
        let field = new TextInputField(prefix, name, vm, viewValue);
        vm.value.type('hidden');
        return field;
    };

    constructor(prefix: string, name: string, vm: InputFieldViewModel, viewValue = null) {
        super(prefix, name, vm, viewValue || new FieldViewValue());
        this.constraints = new TextConstraintCollection();
        vm.value.type('text');
        this.inputVM = vm;
    }

    private readonly inputVM: InputFieldViewModel;

    readonly constraints: TextConstraintCollection;

    protect() {
        this.inputVM.value.type('password');
    }

    setValue(value: string) { super.setValue(value); }

    getValue() { return <string>super.getValue(); }

    setMaxLength(maxLength: number) {
        this.inputVM.value.maxLength(maxLength);
    }

}
