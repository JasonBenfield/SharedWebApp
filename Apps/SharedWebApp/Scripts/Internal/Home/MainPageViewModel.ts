import * as template from './MainPage.html';
import { PageViewModel } from '../../Shared/PageViewModel';
import { singleton } from 'tsyringe';
import { AccountViewModel } from './AccountViewModel';

@singleton()
export class MainPageViewModel extends PageViewModel {
    //constructor() {
    //    super(template);
    //}
    readonly account = new AccountViewModel();
}