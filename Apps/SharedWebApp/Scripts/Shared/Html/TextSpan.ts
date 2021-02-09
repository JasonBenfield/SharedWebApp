import { TextSpanViewModel } from './TextSpanViewModel';
import { HtmlComponent } from "./HtmlComponent";

export class TextSpan extends HtmlComponent {
    constructor(text = '', vm: TextSpanViewModel = new TextSpanViewModel()) {
        super(vm);
        this.setText(text);
    }
    protected readonly vm: TextSpanViewModel;

    private text: string;

    setText(text: string) {
        this.text = text;
        this.vm.text(text);
    }

    setTitleFromText() {
        this.vm.title(this.text);
    }

}