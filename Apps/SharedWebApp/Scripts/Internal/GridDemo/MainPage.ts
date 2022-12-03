import { TextComponent } from '../../Lib/Components/TextComponent';
import { DefaultPageContext } from '../DefaultPageContext';
import { SharedPage } from '../SharedPage';
import { DemoGrid } from './DemoGrid';
import { MainPageView } from './MainPageView';

class MainPage extends SharedPage {
    protected readonly view: MainPageView;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.heading).setText('Grid Demo');
        new DemoGrid(this.view.dataGrid);
    }
}
new DefaultPageContext().load();
new MainPage();