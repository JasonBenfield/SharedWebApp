import { ComplexField } from '../../Shared/Forms/ComplexField';
import { AddressInputFieldViewModel } from './AddressInputFieldViewModel';

export class AddressInputField extends ComplexField {
    constructor(prefix: string, name: string, private readonly vm: AddressInputFieldViewModel) {
        super(prefix, name, vm.caption, vm.value);
    }

    readonly Line1 = this.addTextInputField('Line1', this.vm.value.Line1);
    readonly City = this.addTextInputField('City', this.vm.value.City);
    readonly State = this.addTextInputField('State', this.vm.value.State);
    readonly Zip = this.addTextInputField('Zip', this.vm.value.Zip);
}