import { ComplexFieldFormGroup } from '../../Shared/Forms/ComplexFieldFormGroup';
import { ComplexFieldFormGroupView } from '../../Shared/Forms/ComplexFieldFormGroupView';

export class AddressInputField extends ComplexFieldFormGroup {
    constructor(
        prefix: string,
        name: string
    ) {
        super(prefix, name, new ComplexFieldFormGroupView());
    }

    readonly Line1 = this.addTextInputFormGroup('Line1');
    readonly City = this.addTextInputFormGroup('City');
    readonly State = this.addTextInputFormGroup('State');
    readonly Zip = this.addNumberInputFormGroup('Zip');
}