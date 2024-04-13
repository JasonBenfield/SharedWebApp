import { AlertView } from './AlertView';
import { BasicComponentView } from './BasicComponentView';
import { BasicTextComponentView } from './BasicTextComponentView';
import { TextBlockView } from './TextBlockView';
import { TextHeading4View } from './TextHeadings';

export class MessageAlertView extends AlertView {
    readonly headingTextView: BasicTextComponentView;
    readonly messageTextView: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.headingTextView = this.addView(TextHeading4View);
        this.headingTextView.addCssName('alert-heading');
        this.messageTextView = this.addView(TextBlockView);
    }
}