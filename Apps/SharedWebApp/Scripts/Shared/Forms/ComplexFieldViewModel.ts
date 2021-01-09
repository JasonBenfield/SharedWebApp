import * as ko from 'knockout';
import { FieldValueViewModel } from "./FieldValueViewModel";
import { FieldCaptionViewModel } from "./FieldCaptionViewModel";
import { RowFieldTemplate } from './RowFieldTemplate';

export class ComplexFieldViewModel implements IFieldViewModel {
    constructor(value: IFieldValueViewModel) {
        this.value = value || new FieldValueViewModel();
        let template = new RowFieldTemplate();
        template.register();
        this.componentName(template.componentName);
    }

    readonly componentName = ko.observable('');
    readonly value: IFieldValueViewModel;
    readonly isVisible = ko.observable(true);
    readonly caption = new FieldCaptionViewModel();
}
