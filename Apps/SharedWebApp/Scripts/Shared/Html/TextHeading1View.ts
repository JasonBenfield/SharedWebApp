import { Heading1 } from './Heading1';
import { Heading1ViewModel } from './Heading1ViewModel';
import { TextSpanView } from './TextSpanView';

export class TextHeading1View extends Heading1 implements ITextComponentView {
    protected readonly vm: Heading1ViewModel;
    readonly textSpan = this.addContent(new TextSpanView());

    constructor(vm: Heading1ViewModel = new Heading1ViewModel()) {
        super(vm);
    }

    setText(text: string) { this.textSpan.setText(text); }

    setHtml(html: string) {this.textSpan.setHtml(html);}

    setTitle(title: string) { this.textSpan.setTitle(title); }
}