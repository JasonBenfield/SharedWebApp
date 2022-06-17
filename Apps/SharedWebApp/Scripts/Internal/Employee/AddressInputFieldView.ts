import { ComplexFieldFormGroupView } from '../../Lib/Forms/ComplexFieldFormGroupView';

export class AddressInputFieldView extends ComplexFieldFormGroupView {
    readonly Line1 = this.addInputFormGroup();
    readonly City = this.addInputFormGroup();
    readonly State = this.addInputFormGroup();
    readonly Zip = this.addInputFormGroup();
}