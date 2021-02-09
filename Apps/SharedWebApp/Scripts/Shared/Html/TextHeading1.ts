import { Heading1 } from './Heading1';
import { Heading1ViewModel } from './Heading1ViewModel';
import { TextSpan } from './TextSpan';

export class TextHeading1 extends Heading1 {
    constructor(text: string = '', vm: Heading1ViewModel = new Heading1ViewModel()) {
        super(vm);
        this.setText(text);
    }

    protected readonly vm: Heading1ViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    setText(text: string) {
        this.textSpan.setText(text);
    }
}