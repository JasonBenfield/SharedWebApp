import { Startup } from '../../Shared/Startup';
import { TextBlock } from '../../Shared/Html/TextBlock';
import { PageFrameView } from '../../Shared/PageFrameView';
import { DefaultPageContext } from '../DefaultPageContext';

class MainPage {
    constructor(page: PageFrameView) {
        new DefaultPageContext().load();
        page.addContent(new TextBlock('Shared Home Page'));
    }
}
new MainPage(new Startup().build());