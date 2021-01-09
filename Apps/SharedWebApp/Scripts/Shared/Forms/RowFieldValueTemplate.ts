import { ComponentTemplate } from '../ComponentTemplate';
import * as template from './RowFieldValue.html';

export class RowFieldValueTemplate {
    readonly componentName = 'row-field-value';

    register() {
        new ComponentTemplate(this.componentName, template).register();
    }
}