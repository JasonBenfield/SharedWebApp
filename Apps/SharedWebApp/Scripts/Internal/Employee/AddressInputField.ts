import { ComplexFieldFormGroup } from '../../Lib/Forms/ComplexFieldFormGroup';
import { AddressInputFieldView } from './AddressInputFieldView';

export class AddressInputField extends ComplexFieldFormGroup {
    protected readonly view: AddressInputFieldView;

    constructor(
        prefix: string,
        name: string,
        view: AddressInputFieldView
    ) {
        super(prefix, name, view);
    }

    readonly Line1 = this.addTextInputFormGroup('Line1', this.view.Line1);
    readonly City = this.addTextInputFormGroup('City', this.view.City);
    readonly State = this.addTextInputFormGroup('State', this.view.State);
    readonly Zip = this.addNumberInputFormGroup('Zip', this.view.Zip);
}