import { AlertView } from './AlertView';
import { BlockView } from './BlockView';
import { ContextualClass } from '../ContextualClass';
import { TextBlockView } from './TextBlockView';
import { IContainerView } from './Types';

export class MessageAlertView extends BlockView {
    private readonly alert: AlertView;
    readonly textBlock: TextBlockView;

    constructor(container: IContainerView) {
        super(container);
        this.alert = this.addView(AlertView);
        this.textBlock = this.alert.addView(TextBlockView);
        this.addCssName('alert');
    }

    setContext(context: ContextualClass) {
        this.alert.setContext(context);
    }
}