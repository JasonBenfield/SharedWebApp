import * as ko from "knockout";
import { ComponentTemplate } from "../ComponentTemplate";
import { SimpleFieldViewModel } from "./SimpleFieldViewModel";
import * as template from './InputField.html';
import { FieldValueViewModel } from "./FieldValueViewModel";

export class InputFieldViewModel extends SimpleFieldViewModel {
    constructor() {
        super();
        this.value = new InputFieldValueViewModel();
    }

    readonly value: InputFieldValueViewModel;
}

export class InputFieldValueViewModel extends FieldValueViewModel {
    constructor() {
        super();
        this.inputComponentName('input-field');
        new ComponentTemplate(this.inputComponentName(), template).register();
        this.value.subscribe(this.onValueChanged.bind(this));
    }

    private onValueChanged(value: string) {
        this.change(value);
    }

    readonly type = ko.observable('');
    readonly maxLength = ko.observable<number>(null);
}
