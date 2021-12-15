import { Heading6 } from './Heading6';
import { Heading6ViewModel } from './Heading6ViewModel';
import { TextSpan } from './TextSpan';

export class TextHeading6 extends Heading6 {
    constructor(text: string = '', vm: Heading6ViewModel = new Heading6ViewModel()) {
        super(vm);
        this.setText(text);
    }

    protected readonly vm: Heading6ViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    setText(text: string) {
        this.textSpan.setText(text);
    }
}