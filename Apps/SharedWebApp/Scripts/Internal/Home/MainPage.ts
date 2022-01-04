import { Startup } from '../../Shared/Startup';
import { TextBlock } from '../../Shared/Html/TextBlock';
import { PageFrameView } from '../../Shared/PageFrameView';
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