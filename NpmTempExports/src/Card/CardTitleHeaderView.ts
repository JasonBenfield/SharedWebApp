import { BlockViewModel } from '../Html/BlockViewModel';
import { TextBlockView } from '../Html/TextBlockView';
import { CardHeaderView } from './CardHeaderView';

export class CardTitleHeaderView extends CardHeaderView implements ITextComponentView {
    readonly textBlock = this.addContent(new TextBlockView());

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
    }

    setText(text: string) {
        this.textBlock.setText(text);
    }
}