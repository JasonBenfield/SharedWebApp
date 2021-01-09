import { ComponentTemplate } from '../ComponentTemplate';
import * as template from './RowField.html';

export class RowFieldTemplate {
    readonly componentName = 'row-field';

    register() {
        new ComponentTemplate(this.componentName, template).register();
    }
}