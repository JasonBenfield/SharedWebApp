import { HtmlComponent } from "./HtmlComponent";
import { TextBlockViewModel } from "./TextBlockViewModel";

export class TextBlock extends HtmlComponent {
    constructor(text: string = '', vm: TextBlockViewModel = new TextBlockViewModel()) {
        super(vm);
        this.setText(text);
    }

    readonly vm: TextBlockViewModel;

    private text: string;

    setText(text: string) {
        this.text = text;
        this.vm.text(text);
    }

    setTitleFromText() {
        this.vm.title(this.text);
    }
}