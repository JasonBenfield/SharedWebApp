import { Alert } from './Alert';
import { ContextualClass } from './ContextualClass';
import { Block } from './Html/Block';
import { BlockViewModel } from './Html/BlockViewModel';
import { TextBlock } from './Html/TextBlock';

export class MessageAlertView extends Block {
    private readonly alert = new Alert(this.vm);
    private readonly textBlock = new TextBlock().addToContainer(this.alert.content);

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.addCssName('alert');
    }

    setContext(context: ContextualClass) {
        this.alert.setContext(context);
    }

    setMessage(message: string) {
        this.textBlock.setText(message);
    }
}