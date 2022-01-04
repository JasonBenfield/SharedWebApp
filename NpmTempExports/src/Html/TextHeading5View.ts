import { Heading5 } from './Heading5';
import { Heading5ViewModel } from './Heading5ViewModel';
import { TextSpanView } from './TextSpanView';

export class TextHeading5View extends Heading5 implements ITextComponentView {
    protected readonly vm: Heading5ViewModel;
    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: Heading5ViewModel = new Heading5ViewModel()) {
        super(vm);
    }

    setText(text: string) { this.textSpan.setText(text); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}