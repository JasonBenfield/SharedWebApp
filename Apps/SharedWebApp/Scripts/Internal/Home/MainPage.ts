import { Startup } from 'xtistart';
import { TextBlock } from '../../Shared/Html/TextBlock';
import { PageFrame } from '../../Shared/PageFrame';

class MainPage {
    constructor(page: PageFrame) {
        page.addContent(new TextBlock('Shared Home Page'));
    }
}
new MainPage(new Startup().build());