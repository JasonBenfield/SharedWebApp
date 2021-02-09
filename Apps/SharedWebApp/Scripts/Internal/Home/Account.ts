import { HtmlComponent } from '../../Shared/Html/HtmlComponent';
import { AccountViewModel } from './AccountViewModel';

export class Account extends HtmlComponent {
    constructor(vm = new AccountViewModel()) {
        super(vm);
    }
}