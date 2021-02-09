import { CardHeader } from './CardHeader';
import { BlockViewModel } from '../Html/BlockViewModel';
import { TextBlock } from '../Html/TextBlock';

export class CardTitleHeader extends CardHeader {
    constructor(title: string = '', vm: BlockViewModel = new BlockViewModel()) {
        super(vm);
        this.setText(title);
        
    }
    private readonly textBlock = this.addContent(new TextBlock());

    setText(text: string) {
        this.textBlock.setText(text);
    }
}