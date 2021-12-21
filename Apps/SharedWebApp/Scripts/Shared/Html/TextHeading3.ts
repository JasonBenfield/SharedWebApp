import { Heading3 } from './Heading3';
import { Heading3ViewModel } from './Heading3ViewModel';
import { TextSpan } from './TextSpan';

export class TextHeading3 extends Heading3 {
    protected readonly vm: Heading3ViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    constructor(text: string = '', vm: Heading3ViewModel = new Heading3ViewModel()) {
        super(vm);
        this.setText(text);
    }

    setText(text: string) {
        this.textSpan.setText(text);
    }
}