import { ComponentTemplate } from './ComponentTemplate';
import * as ko from 'knockout';
import { ComponentViewModel } from './ComponentViewModel';

export class PageViewModel extends ComponentViewModel {
    constructor(template: any) {
        super(new ComponentTemplate('page-body', template));
    }
}