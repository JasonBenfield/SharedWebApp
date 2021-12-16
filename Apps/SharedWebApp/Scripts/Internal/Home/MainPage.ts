import { Startup } from 'xtistart';
import { TextBlock } from '../../Shared/Html/TextBlock';
import { PageFrameView } from '../../Shared/PageFrameView';

class MainPage {
    constructor(page: PageFrameView) {
        page.addContent(new TextBlock('Shared Home Page'));
    }
}
new MainPage(new Startup().build());