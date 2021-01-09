import * as ko from 'knockout';
import * as template from './DropDownField.html';
import { ComponentTemplate } from "../ComponentTemplate";
import { DropDownFieldItem } from "./DropDownFieldItem";
import { SimpleFieldViewModel } from "./SimpleFieldViewModel";
import { FieldValueViewModel } from './FieldValueViewModel';

export class DropDownFieldViewModel extends SimpleFieldViewModel {
    constructor() {
        super();
        this.value = new DropDownFieldValueViewModel();
    }

    readonly value: DropDownFieldValueViewModel;
}

export class DropDownFieldValueViewModel extends FieldValueViewModel {
    constructor() {
        super();
        this.inputComponentName('drop-down-field');
        new ComponentTemplate(this.inputComponentName(), template).register();
        this.value.subscribe(this.onValueChanged.bind(this));
    }

    private onValueChanged(value: any) {
        this.change(value);
    }

    readonly items = ko.observableArray<DropDownFieldItem<any>>([]);
    readonly itemsText = ko.observable('displayText');
    readonly itemsValue = ko.observable('value');
    readonly itemsCaption = ko.observable('');
}
