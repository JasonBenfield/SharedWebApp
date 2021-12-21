import { TextSpanViewModel } from './TextSpanViewModel';
import { HtmlComponent } from "./HtmlComponent";

export class TextSpan extends HtmlComponent {
    protected readonly vm: TextSpanViewModel;
    private text: string;
    private formatTitle: (text: string) => string;

    constructor(text = '', vm: TextSpanViewModel = new TextSpanViewModel()) {
        super(vm);
        this.setText(text);
    }

    setText(text: string) {
        this.text = text;
        this.vm.text(text);
        this.updateTitleFromText();
    }

    syncTitleWithText(format?: (text: string) => string) {
        this.formatTitle = format || ((text: string) => text);
        this.updateTitleFromText();
    }

    private updateTitleFromText() {
        if (this.formatTitle) {
            this.vm.title(this.formatTitle(this.text));
        }
    }
}