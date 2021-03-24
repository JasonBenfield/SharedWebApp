import { Small } from './Small';
import { SmallViewModel } from './SmallViewModel';
import { TextSpan } from './TextSpan';

export class TextSmall extends Small {
    constructor(text: string = '', vm: SmallViewModel = new SmallViewModel()) {
        super(vm);
        this.setText(text);
    }

    protected readonly vm: SmallViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    setText(text: string) {
        this.textSpan.setText(text);
    }
}