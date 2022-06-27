import { BasicPageView } from '../../Lib/Views/BasicPageView';
import { TextBlockView } from '../../Lib/Views/TextBlockView';

export class MainPageView extends BasicPageView {
    readonly text: TextBlockView;

    constructor() {
        super();
        this.text = this.addView(TextBlockView);
    }
}