import { HtmlComponent } from "./HtmlComponent";
import { TextBlockViewModel } from "./TextBlockViewModel";

export class TextBlock extends HtmlComponent {
    readonly vm: TextBlockViewModel;
    private text: string;
    private formatTitle: (text: string) => string;

    constructor(text: string = '', vm: TextBlockViewModel = new TextBlockViewModel()) {
        super(vm);
        this.setText(text);
    }

    setText(text: string) {
        this.text = text;
        this.vm.text(text);
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