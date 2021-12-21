import { CardHeader } from './CardHeader';
import { BlockViewModel } from '../Html/BlockViewModel';
import { TextBlock } from '../Html/TextBlock';

export class CardTitleHeaderView extends CardHeader {
    private readonly textBlock = this.addContent(new TextBlock());

    constructor(vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        
    }

    setText(text: string) {
        this.textBlock.setText(text);
    }
}