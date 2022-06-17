import { TextBlock } from '../../Lib/Html/TextBlock';
import { PageFrameView } from '../../Lib/PageFrameView';
import { Startup } from '../../Lib/Startup';
import { DefaultPageContext } from '../DefaultPageContext';
import { DemoGrid } from './DemoGrid';
import { MainPageView } from './MainPageView';

class MainPage {
    constructor(page: PageFrameView) {
        let view = new MainPageView(page);
        new TextBlock('Grid Demo', view.heading);
        new DemoGrid(view.dataGrid);
    }
}
new DefaultPageContext().load();
new MainPage(new Startup().build());