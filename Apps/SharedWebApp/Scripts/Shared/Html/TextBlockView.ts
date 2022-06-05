import { HtmlComponent } from "./HtmlComponent";
import { TextBlockViewModel } from "./TextBlockViewModel";

export class TextBlockView extends HtmlComponent implements ITextComponentView {
    readonly vm: TextBlockViewModel;

    constructor(vm: TextBlockViewModel = new TextBlockViewModel()) {
        super(vm);
    }

    setText(text: string) {
        this.vm.text(text);
    }

    setHtml(html: string) {
        this.vm.html(html);
    }

    setTitle(title: string) {
        this.vm.title(title);
    }
}