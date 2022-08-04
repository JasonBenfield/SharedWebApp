import { AlertView } from './AlertView';
import { BasicComponentView } from './BasicComponentView';
import { TextBlockView } from './TextBlockView';

export class MessageAlertView extends AlertView {
    readonly textBlock: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.textBlock = this.addView(TextBlockView);
    }
}