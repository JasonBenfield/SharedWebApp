import { Startup } from '../../Lib/Startup';
import { TextBlock } from '../../Lib/Html/TextBlock';
import { PageFrameView } from '../../Lib/PageFrameView';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';

class MainPage {
    constructor(page: PageFrameView) {
        let view = new MainPageView(page);
        new TextBlock('Shared Home Page', view.text);
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());