import { TextBlockView } from '../../Lib/Views/TextBlockView';
import { SharedPageView } from '../SharedPageView';

export class MainPageView extends SharedPageView {
    readonly text: TextBlockView;

    constructor() {
        super();
        this.text = this.addView(TextBlockView);
    }
}