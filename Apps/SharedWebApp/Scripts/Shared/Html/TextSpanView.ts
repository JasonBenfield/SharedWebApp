import { TextSpanViewModel } from './TextSpanViewModel';
import { HtmlComponent } from "./HtmlComponent";

export class TextSpanView extends HtmlComponent implements ITextComponentView {
    protected readonly vm: TextSpanViewModel;

    constructor(vm: TextSpanViewModel = new TextSpanViewModel()) {
        super(vm);
    }

    setText(text: string) {
        this.vm.html(null);
        this.vm.text(text);
    }

    setHtml(html: string) {
        this.vm.text(null);
        this.vm.html(html);
    }

    setTitle(title: string) {
        this.vm.title(title);
    }
}