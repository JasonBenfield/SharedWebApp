import { HtmlComponent } from "./HtmlComponent";
import { HtmlSpanViewModel } from './HtmlSpanViewModel';

export class HtmlSpanView extends HtmlComponent {
    protected readonly vm: HtmlSpanViewModel;

    constructor(vm: HtmlSpanViewModel = new HtmlSpanViewModel()) {
        super(vm);
    }

    setHtml(html: string) {
        this.vm.html(html);
    }

    setTitle(title: string) {
        this.vm.title(title);
    }
}