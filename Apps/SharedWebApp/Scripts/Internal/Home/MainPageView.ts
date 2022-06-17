import { TextBlockView } from '../../Lib/Html/TextBlockView';
import { PageFrameView } from '../../Lib/PageFrameView';

export class MainPageView {
    readonly text: TextBlockView;

    constructor(page: PageFrameView) {
        this.text = page.addContent(new TextBlockView());
    }
}