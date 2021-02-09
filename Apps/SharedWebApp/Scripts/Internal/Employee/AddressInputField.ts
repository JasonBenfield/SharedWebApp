import { ComplexFieldFormGroup } from '../../Shared/Forms/ComplexFieldFormGroup';
import { BlockViewModel } from '../../Shared/Html/BlockViewModel';

export class AddressInputField extends ComplexFieldFormGroup {
    constructor(
        prefix: string,
        name: string,
        vm: BlockViewModel = new BlockViewModel()
    ) {
        super(prefix, name, vm);
    }

    readonly Line1 = this.addTextInputFormGroup('Line1');
    readonly City = this.addTextInputFormGroup('City');
    readonly State = this.addTextInputFormGroup('State');
    readonly Zip = this.addNumberInputFormGroup('Zip');
}