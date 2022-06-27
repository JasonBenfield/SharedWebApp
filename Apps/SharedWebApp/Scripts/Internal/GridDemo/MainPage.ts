import { BasicPage } from '../../Lib/Components/BasicPage';
import { TextBlock } from '../../Lib/Html/TextBlock';
import { PageFrameView } from '../../Lib/PageFrameView';
import { Startup } from '../../Lib/Startup';
import { DefaultPageContext } from '../DefaultPageContext';
import { DemoGrid } from './DemoGrid';
import { MainPageView } from './MainPageView';

class MainPage extends BasicPage {
    protected readonly view: MainPageView;

    constructor() {
        super(new MainPageView());
        new TextBlock('Grid Demo', this.view.heading);
        new DemoGrid(this.view.dataGrid);
    }
}
new DefaultPageContext().load();
new MainPage();