import { ComponentTemplateAsync } from '../../Shared/ComponentTemplateAsync';
import { HtmlComponentViewModel } from '../../Shared/Html/HtmlComponentViewModel';

export class AccountViewModel extends HtmlComponentViewModel {
    constructor() {
        super(new ComponentTemplateAsync('account', '/Shared/Current/Home/Account'));
    }
}