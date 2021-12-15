import { Heading5 } from './Heading5';
import { Heading5ViewModel } from './Heading5ViewModel';
import { TextSpan } from './TextSpan';

export class TextHeading5 extends Heading5 {
    constructor(text: string = '', vm: Heading5ViewModel = new Heading5ViewModel()) {
        super(vm);
        this.setText(text);
    }

    protected readonly vm: Heading5ViewModel;

    readonly textSpan = this.addContent(new TextSpan());

    setText(text: string) {
        this.textSpan.setText(text);
    }
}