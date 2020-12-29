import * as ko from 'knockout';
import { ComponentTemplateAsync } from '../../Shared/ComponentTemplateAsync';
export class AccountViewModel {
    constructor() {
        new ComponentTemplateAsync(this.componentName(), '/Shared/Current/Home/Account').register();
    }

    readonly componentName = ko.observable('account');
}