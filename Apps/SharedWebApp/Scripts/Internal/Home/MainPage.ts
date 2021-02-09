import { Startup } from 'xtistart';
import { PageFrame } from '../../Shared/PageFrame';

class MainPage {
    constructor(page: PageFrame) {
    }
}
new MainPage(new Startup().build());