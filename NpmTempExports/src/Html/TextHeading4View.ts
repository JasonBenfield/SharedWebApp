import { Heading4 } from './Heading4';
import { Heading4ViewModel } from './Heading4ViewModel';
import { TextSpanView } from './TextSpanView';

export class TextHeading4View extends Heading4 implements ITextComponentView {
    protected readonly vm: Heading4ViewModel;

    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: Heading4ViewModel = new Heading4ViewModel()) {
        super(vm);
    }

    setText(text: string) { this.textSpan.setText(text); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}