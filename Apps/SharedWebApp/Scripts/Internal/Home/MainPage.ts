import { BasicPage } from '../../Lib/Components/BasicPage';
import { TextComponent } from '../../Lib/Components/TextComponent';
import { DefaultPageContext } from '../DefaultPageContext';
import { MainPageView } from './MainPageView';

class MainPage extends BasicPage {
    protected readonly view: MainPageView;

    constructor() {
        super(new MainPageView());
        new TextComponent(this.view.text).setText('Shared Home Page');
    }
}
new DefaultPageContext().load();
new MainPage();