import { ContextualClass } from './ContextualClass';
import { Block } from './Html/Block';
import { BlockViewModel } from './Html/BlockViewModel';
import { TextBlockView } from './Html/TextBlockView';
export declare class MessageAlertView extends Block {
    private readonly alert;
    readonly textBlock: TextBlockView;
    constructor(vm?: BlockViewModel);
    setContext(context: ContextualClass): void;
}
