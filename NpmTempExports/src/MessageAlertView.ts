import { Alert } from './Alert';
import { ContextualClass } from './ContextualClass';
import { Block } from './Html/Block';
import { BlockViewModel } from './Html/BlockViewModel';
import { TextBlockView } from './Html/TextBlockView';

export class MessageAlertView extends Block {
    private readonly alert: Alert;
    readonly textBlock: TextBlockView;

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.alert = new Alert(this.vm);
        this.textBlock = new TextBlockView().addToContainer(this.alert.content);
        this.addCssName('alert');
    }

    setContext(context: ContextualClass) {
        this.alert.setContext(context);
    }
}