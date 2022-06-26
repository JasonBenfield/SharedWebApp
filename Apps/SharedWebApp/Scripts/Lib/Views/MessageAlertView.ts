import { ContextualClass } from '../ContextualClass';
import { AlertView } from './AlertView';
import { BasicComponentView } from './BasicComponentView';
import { BlockView } from './BlockView';
import { TextBlockView } from './TextBlockView';

export class MessageAlertView extends BlockView {
    private readonly alert: AlertView;
    readonly textBlock: TextBlockView;

    constructor(container: BasicComponentView) {
        super(container);
        this.alert = this.addView(AlertView);
        this.textBlock = this.alert.addView(TextBlockView);
        this.addCssName('alert');
    }

    setContext(context: ContextualClass) {
        this.alert.setContext(context);
    }
}