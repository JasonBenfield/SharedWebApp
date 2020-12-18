import * as ko from 'knockout';
import { ComponentTemplateAsync } from '../../Shared/ComponentTemplateAsync';
export class AccountViewModel {
    constructor() {
        new ComponentTemplateAsync(this.template(), '/Shared/Current/Home/Account').register();
    }

    readonly template = ko.observable('account');
}