import * as ko from 'knockout';
import { FieldValueViewModel } from "../../Shared/Forms/FieldValueViewModel";
import { FieldCaptionViewModel } from "./FieldCaptionViewModel";
import { RowFieldTemplate } from './RowFieldTemplate';

export class SimpleFieldViewModel implements IFieldViewModel {
    constructor() {
        let template = new RowFieldTemplate();
        this.componentName(template.componentName);
        template.register();
    }

    readonly componentName = ko.observable('');
    readonly caption = new FieldCaptionViewModel();
    readonly value = new FieldValueViewModel();
    readonly isVisible = ko.observable<boolean>(true);
}
