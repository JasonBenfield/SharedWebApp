import { ComponentTemplate } from "../../Shared/ComponentTemplate";
import { ComplexFieldViewModel } from "../../Shared/Forms/ComplexFieldViewModel";
import { ComplexFieldValueViewModel } from "../../Shared/Forms/FieldValueViewModel";
import { InputFieldViewModel } from "../../Shared/Forms/InputFieldViewModel";
import * as template from './AddressInput.html';

export class AddressInputValueViewModel extends ComplexFieldValueViewModel {
    constructor() {
        super();
        this.inputComponentName('address-input');
        new ComponentTemplate(this.inputComponentName(), template).register();
    }

    readonly Line1 = this.addValue(new InputFieldViewModel());
    readonly City = this.addValue(new InputFieldViewModel());
    readonly State = this.addValue(new InputFieldViewModel());
    readonly Zip = this.addValue(new InputFieldViewModel());
}

export class AddressInputFieldViewModel extends ComplexFieldViewModel {
    constructor() {
        super(new AddressInputValueViewModel());
    }

    readonly value: AddressInputValueViewModel;
}



