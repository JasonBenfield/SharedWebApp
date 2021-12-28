import { TextBlockView } from '../../Shared/Html/TextBlockView';
import { PageFrameView } from '../../Shared/PageFrameView';

export class MainPageView {
    readonly text: TextBlockView;

    constructor(page: PageFrameView) {
        this.text = page.addContent(new TextBlockView());
    }
}