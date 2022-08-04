import { BasicComponentView } from '../../Lib/Views/BasicComponentView';
import { ComplexFieldFormGroupView } from '../../Lib/Views/ComplexFieldFormGroupView';
import { SimpleFieldFormGroupInputView } from '../../Lib/Views/FormGroup';
import { IFormGroupLayout } from '../../Lib/Views/Types';

export interface IAddressInputFieldView {
    Line1: SimpleFieldFormGroupInputView;
    City: SimpleFieldFormGroupInputView;
    State: SimpleFieldFormGroupInputView;
    Zip: SimpleFieldFormGroupInputView;
}

export class DefaultAddressInputFieldViewLayout implements IFormGroupLayout<IAddressInputFieldView> {
    addFormGroups(view: AddressInputFieldView) {
        return {
            Line1: view.addInputFormGroup(),
            City: view.addInputFormGroup(),
            State: view.addInputFormGroup(),
            Zip: view.addInputFormGroup()
        };
    }
}

export class AddressInputFieldView extends ComplexFieldFormGroupView {
    private formGroups: IAddressInputFieldView;

    constructor(container: BasicComponentView) {
        super(container);
    }

    addFormGroups(layout?: DefaultAddressInputFieldViewLayout) {
        if (!layout) {
            layout = new DefaultAddressInputFieldViewLayout();
        }
        this.formGroups = layout.addFormGroups(this);
    }

    get Line1() { return this.formGroups.Line1; }

    get City() { return this.formGroups.City; }

    get State() { return this.formGroups.State; }

    get Zip() { return this.formGroups.Zip; }
}