import { TextSpanViewModel } from './TextSpanViewModel';
import { HtmlComponent } from "./HtmlComponent";

export class TextSpanView extends HtmlComponent implements ITextComponentView {
    protected readonly vm: TextSpanViewModel;

    constructor(vm: TextSpanViewModel = new TextSpanViewModel()) {
        super(vm);
    }

    setText(text: string) {
        this.vm.text(text);
    }

    setTitle(title: string) {
        this.vm.title(title);
    }
}