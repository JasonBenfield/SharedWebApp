import { Heading3 } from './Heading3';
import { Heading3ViewModel } from './Heading3ViewModel';
import { TextSpanView } from './TextSpanView';

export class TextHeading3View extends Heading3 implements ITextComponentView {
    protected readonly vm: Heading3ViewModel;
    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: Heading3ViewModel = new Heading3ViewModel()) {
        super(vm);
    }

    setText(text: string) { this.textSpan.setText(text); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}