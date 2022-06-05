import { Heading2 } from './Heading2';
import { Heading2ViewModel } from './Heading2ViewModel';
import { TextSpanView } from './TextSpanView';

export class TextHeading2View extends Heading2 implements ITextComponentView {
    protected readonly vm: Heading2ViewModel;
    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: Heading2ViewModel = new Heading2ViewModel()) {
        super(vm);
    }

    setText(text: string) { this.textSpan.setText(text); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}