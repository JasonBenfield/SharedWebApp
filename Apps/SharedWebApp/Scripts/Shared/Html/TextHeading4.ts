import { Heading4 } from './Heading4';
import { Heading4ViewModel } from './Heading4ViewModel';
import { TextSpan } from './TextSpan';

export class TextHeading4 extends Heading4 {
    constructor(text: string = '', vm: Heading4ViewModel = new Heading4ViewModel()) {
        super(vm);
        this.setText(text);
    }

    protected readonly vm: Heading4ViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    setText(text: string) {
        this.textSpan.setText(text);
    }
}