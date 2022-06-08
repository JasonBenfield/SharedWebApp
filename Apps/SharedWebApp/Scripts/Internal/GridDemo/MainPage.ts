import { TextBlock } from '../../Shared/Html/TextBlock';
import { PageFrameView } from '../../Shared/PageFrameView';
import { Startup } from '../../Shared/Startup';
import { DefaultPageContext } from '../DefaultPageContext';
import { DemoGrid } from './DemoGrid';
import { MainPageView } from './MainPageView';

class MainPage {
    constructor(page: PageFrameView) {
        let view = new MainPageView(page);
        new TextBlock('Grid Demo', view.heading);
        new DemoGrid(view.grid);
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());