import { Heading2 } from './Heading2';
import { Heading2ViewModel } from './Heading2ViewModel';
import { TextSpan } from './TextSpan';

export class TextHeading2 extends Heading2 {
    protected readonly vm: Heading2ViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    constructor(text: string = '', vm: Heading2ViewModel = new Heading2ViewModel()) {
        super(vm);
        this.setText(text);
    }

    setText(text: string) {
        this.textSpan.setText(text);
    }
}