import { Heading6 } from './Heading6';
import { Heading6ViewModel } from './Heading6ViewModel';
import { TextSpanView } from './TextSpanView';

export class TextHeading6View extends Heading6 implements ITextComponentView {
    protected readonly vm: Heading6ViewModel;
    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: Heading6ViewModel = new Heading6ViewModel()) {
        super(vm);
    }

    setText(text: string) { this.textSpan.setText(text); }

    setHtml(html: string) { this.textSpan.setHtml(html); }

    setTitle(title: string) { this.textSpan.setTitle(title); }
}